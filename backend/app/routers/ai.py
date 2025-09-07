from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.dependencies import get_current_active_user
from app.schemas import User
from app.services.ai_service_updated import generate_roadmap_from_goal as generate_roadmap_response # Import the AI model caller

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)

class AIChatMessage(BaseModel):
    content: str

class AIChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=AIChatResponse)
async def ai_chat(
    message: AIChatMessage,
    current_user: User = Depends(get_current_active_user)
):
    """
    Handles general AI chat messages.
    """
    try:
        # Prepare messages for the AI model
        # You can add system messages here for context or persona
        messages = [
            {"role": "user", "content": message.content}
        ]
        ai_response_content = await _call_ai_model(messages)
        return {"response": ai_response_content}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"AI chat failed: {e}")
