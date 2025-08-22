import os
import json
import logging
import asyncio
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
import redis
from app.core import config

# Langchain imports
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Redis configuration
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_DB = int(os.getenv("REDIS_DB", 0))

# Initialize Redis client
try:
    redis_client = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB, decode_responses=True)
    redis_client.ping()
    logging.info("Successfully connected to Redis.")
except redis.exceptions.ConnectionError as e:
    logging.error(f"Could not connect to Redis: {e}")
    redis_client = None

# Initialize Langchain ChatGoogleGenerativeAI model
# Ensure GOOGLE_API_KEY is set in your .env file
if not config.GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not set in environment variables.")

llm = ChatGoogleGenerativeAI(
    google_api_key=config.GOOGLE_API_KEY,
    model="gemini-1.5-flash",  # You can change this to another Gemini model
    temperature=0.7,
    max_output_tokens=8000
)

class AIResponseMalformedError(Exception):
    """Custom exception for malformed AI responses."""
    pass

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=10),
    retry=retry_if_exception_type(Exception) # Catch generic exceptions for retry
)
async def _call_ai_model(messages: list) -> str:
    """
    Internal function to call the AI model with retry logic using Langchain.
    """
    try:
        # Convert dict messages to Langchain message objects
        langchain_messages = []
        for msg in messages:
            if msg["role"] == "system":
                langchain_messages.append(SystemMessage(content=msg["content"]))
            elif msg["role"] == "user":
                langchain_messages.append(HumanMessage(content=msg["content"]))
            # Add other roles if necessary (e.g., AIMessage for assistant)

        response = await llm.ainvoke(langchain_messages)
        return response.content
    except Exception as e:
        logging.error(f"Error calling AI model: {e}", exc_info=True)
        raise

async def generate_roadmap_from_goal(career_goal: str) -> dict:
    """
    Generates a roadmap (topics, subtopics, skills) from a career goal using Langchain AI.
    Includes caching, retry, and self-healing for malformed responses.
    """
    prompt_messages = [
        {
            "role": "system",
            "content": """You are an expert technical instructor and AI assistant.  
Your task is to generate a structured **learning roadmap** for any career goal.  

⚠️ Important rules:
- Return only a valid JSON object.  
- Do not include code fences, markdown, or explanatory text outside JSON.  
- The roadmap must focus on **technical topics and subtopics** (like data types, variables, OOP, SQL, web frameworks, ML libraries, etc.).  
- Do NOT include job titles, career progression and soft skills.  

The JSON must always follow this format:
{
  "title": "string",
  "description": "string",
  "topics": [
    {
      "name": "string",
      "subtopics": [
        {
          "name": "string",
          "skills": [
            {
              "name": "string",
              "description": "string",
              "estimated_hours": "number",
              "difficulty": "string"
            }
          ]
        }
      ]
    }
  ]
}

Example (for Python Developer):
{
  "title": "Python Developer Roadmap",
  "description": "Step-by-step roadmap to learn Python development",
  "topics": [
    {
      "name": "Basic Python",
      "subtopics": [
        {
          "name": "Variables and Data Types",
          "skills": [
            {
              "name": "Understand Python's basic data types (int, float, str, bool)",
              "description": "Learn how to declare and use different data types in Python.",
              "estimated_hours": 2,
              "difficulty": "Beginner"
            },
            {
              "name": "Work with variables and assignment",
              "description": "Practice assigning values to variables and reassigning them.",
              "estimated_hours": 1,
              "difficulty": "Beginner"
            }
          ]
        },
        {
          "name": "Control Flow",
          "skills": [
            {
              "name": "Implement if/else statements",
              "description": "Learn to control program flow based on conditions.",
              "estimated_hours": 3,
              "difficulty": "Beginner"
            },
            {
              "name": "Use for and while loops",
              "description": "Understand and apply different looping constructs.",
              "estimated_hours": 4,
              "difficulty": "Beginner"
            }
          ]
        }
      ]
    },
    {
      "name": "Web Development with FastAPI",
      "subtopics": [
        {
          "name": "Introduction to FastAPI",
          "skills": [
            {
              "name": "Set up a basic FastAPI application",
              "description": "Create your first 'Hello World' API with FastAPI.",
              "estimated_hours": 5,
              "difficulty": "Intermediate"
            },
            {
              "name": "Understand path operations and request methods",
              "description": "Learn to define API endpoints for GET, POST, PUT, DELETE.",
              "estimated_hours": 4,
              "difficulty": "Intermediate"
            }
          ]
        }
      ]
    }
  ]
}"""
        },
        {
            "role": "user",
            "content": f"Generate a technical learning roadmap for: {career_goal}"
        }
    ]

    cache_key = f"roadmap_goal:{career_goal}"

    if redis_client:
        cached_response = redis_client.get(cache_key)
        if cached_response:
            logging.info(f"Returning cached response for goal: '{career_goal}'")
            return json.loads(cached_response)

    response_data = None
    for attempt in range(3): # Max 3 attempts for self-healing
        try:
            logging.info(f"Attempt {attempt + 1} to generate roadmap for goal: '{career_goal}'")
            ai_content = await _call_ai_model(prompt_messages)
            
            # Clean the response by removing markdown code fences
            cleaned_content = ai_content.strip()
            if cleaned_content.startswith('```json'):
                cleaned_content = cleaned_content[7:]  # Remove ```json
            if cleaned_content.endswith('```'):
                cleaned_content = cleaned_content[:-3]  # Remove ```
            cleaned_content = cleaned_content.strip()
            
            # Attempt to parse JSON
            response_data = json.loads(cleaned_content)
            
            # Basic validation of the structure
            if not isinstance(response_data, dict) or "topics" not in response_data:
                raise AIResponseMalformedError("AI response is not a dictionary or missing 'topics' key.")
            
            # Ensure required fields are present
            if "title" not in response_data:
                response_data["title"] = f"Roadmap for {career_goal}"
            if "description" not in response_data:
                response_data["description"] = f"A comprehensive roadmap for {career_goal}"
            
            logging.info(f"Successfully generated roadmap for goal: '{career_goal}'")
            break # Exit loop if successful
        except json.JSONDecodeError as e:
            logging.warning(f"AI response is not valid JSON (attempt {attempt + 1}): {e}. Content: {ai_content[:200]}...")
            prompt_messages.append({"role": "user", "content": f"The previous response was not valid JSON. Please provide the response again, ensuring it is valid JSON without markdown formatting. Error: {e}"})
        except AIResponseMalformedError as e:
            logging.warning(f"AI response malformed (attempt {attempt + 1}): {e}. Content: {ai_content[:200]}...")
            prompt_messages.append({"role": "user", "content": f"The previous response was malformed: {e}. Please provide the response again, ensuring it follows the specified JSON structure."})
        except Exception as e:
            logging.error(f"An unexpected error occurred during roadmap generation: {e}")
            raise # Re-raise other exceptions

    if response_data and redis_client:
        redis_client.setex(cache_key, 3600, json.dumps(response_data)) # Cache for 1 hour
        logging.info(f"Cached roadmap for goal: '{career_goal}'")

    if not response_data:
        logging.error(f"Failed to generate valid roadmap after multiple attempts for goal: '{career_goal}'")
        # Fallback: Return a default or empty roadmap structure
        return {
            "title": f"Roadmap for {career_goal}",
            "description": "Could not generate a detailed roadmap. Please try again.",
            "topics": []
        }
    return response_data