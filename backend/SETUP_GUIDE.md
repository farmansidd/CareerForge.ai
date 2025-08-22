# OpenRouter API Integration Setup Guide

## Overview
This guide will help you fix the OpenRouter API integration issue in your career roadmap generator.

## Step 1: Obtain OpenRouter API Key

1. **Visit OpenRouter**: Go to https://openrouter.ai/keys
2. **Create Account**: Sign up for a free account
3. **Generate API Key**: Navigate to the API keys section and create a new key
4. **Copy Key**: Save your API key securely

## Step 2: Update Environment Variables

Update your `.env` file with the following:

```bash
# OpenRouter Configuration
AI_API_KEY=your-actual-openrouter-api-key-here
OPENROUTER_MODEL=openai/gpt-4o
OPENROUTER_REFERER=https://your-app-domain.com
OPENROUTER_TITLE=Career Roadmap Generator

# Optional: Update these if needed
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
```

## Step 3: Verify Installation

1. **Install Dependencies** (if not already done):
```bash
cd backend
pip install -r requirements.txt
```

2. **Test the API**:
```bash
python -c "from app.services.ai_service import generate_roadmap_from_goal; import asyncio; print(asyncio.run(generate_roadmap_from_goal('Software Engineer')))"
```

## Step 4: Common Issues & Solutions

### Issue 1: "Invalid API key"
- **Solution**: Check if `AI_API_KEY` is correctly set in `.env`
- **Verify**: Ensure no extra spaces or quotes around the key

### Issue 2: "Rate limit exceeded"
- **Solution**: Implement exponential backoff (already included)
- **Wait**: Allow time between requests

### Issue 3: "HTTP 400 Bad Request"
- **Solution**: Check model name format (use `openai/gpt-4o` not just `gpt-4o`)

### Issue 4: "Connection timeout"
- **Solution**: Increase timeout values in `ai_service.py`

## Step 5: Testing

### Manual Test
```python
# Test script
import asyncio
from app.services.ai_service import generate_roadmap_from_goal

async def test_roadmap():
    result = await generate_roadmap_from_goal("Become a Data Scientist")
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    asyncio.run(test_roadmap())
```

### API Test
```bash
curl -X POST http://localhost:8000/api/roadmaps/generate \
  -H "Content-Type: application/json" \
  -d '{"goal": "Become a Full Stack Developer"}'
```

## Step 6: Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `AI_API_KEY` | Your OpenRouter API key | `sk-or-v1-...` |
| `OPENROUTER_MODEL` | Model to use | `openai/gpt-4o` |
| `REDIS_HOST` | Redis server host | `localhost` |
| `REDIS_PORT` | Redis server port | `6379` |

## Step 7: Debugging

### Enable Debug Logging
Add to your Python test script:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Check API Response
The service now includes detailed error messages:
- 401: Invalid API key
- 429: Rate limit exceeded
- 500+: Server errors

## Support
If you encounter issues:
1. Check the logs in your terminal
2. Verify your API key is active at https://openrouter.ai/keys
3. Ensure your account has sufficient credits
