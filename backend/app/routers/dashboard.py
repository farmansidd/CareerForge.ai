from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_active_user
from app.schemas import User

router = APIRouter(tags=["Dashboard"])

@router.get("/dashboard/stats")
def get_dashboard_stats(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    # Placeholder for aggregated statistics
    return {
        "total_goals": 5,
        "completed_goals": 2,
        "total_skills": 10,
        "completed_skills": 4,
        "roadmap_progress": 60
    }

@router.get("/dashboard/goals")
def get_dashboard_goals(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    # Placeholder for user's goals summary
    return [
        {"id": 1, "name": "Become a Senior Developer", "status": "In Progress", "progress": 50},
        {"id": 2, "name": "Learn Machine Learning", "status": "Completed", "progress": 100},
        {"id": 3, "name": "Improve Communication Skills", "status": "Not Started", "progress": 0}
    ]

@router.get("/dashboard/recommendations")
def get_dashboard_recommendations(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    # Placeholder for AI-generated recommendations
    return [
        {"id": 1, "type": "topic", "name": "Advanced Python", "description": "Deep dive into Python's advanced features.", "progress": 0},
        {"id": 2, "type": "subtopic", "name": "Generative AI with TensorFlow", "description": "Explore building generative models.", "progress": 0},
        {"id": 3, "type": "skill", "name": "Effective Team Collaboration", "description": "Improve your teamwork and communication.", "progress": 0}
    ]
