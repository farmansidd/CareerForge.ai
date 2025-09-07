from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_active_user
from app.schemas import User, DashboardResponse
import app.models as models
import app.crud as crud

router = APIRouter(tags=["Dashboard"])

@router.get("/dashboard", response_model=DashboardResponse)
async def get_dashboard(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    print(f"Dashboard API called for user: {current_user.id} ({current_user.username})")
    # Fetch all roadmaps for the user
    roadmaps_from_db = crud.get_roadmaps_by_user(db, current_user.id)
    print(f"Found {len(roadmaps_from_db)} roadmaps for user")
    
    roadmaps_progress = []
    total_skills = 0
    completed_skills = 0
    all_skills = []

    for roadmap in roadmaps_from_db:
        roadmap_total_skills = 0
        roadmap_completed_skills = 0
        for topic in roadmap.topics:
            for subtopic in topic.subtopics:
                roadmap_total_skills += len(subtopic.skills)
                for skill in subtopic.skills:
                    all_skills.append({
                        "skill_id": skill.id,
                        "name": skill.name,
                        "category": skill.category,
                        "difficulty": skill.difficulty,
                        "status": skill.status,
                        "due_date": None, # Placeholder
                    })
                    if skill.status == "completed":
                        roadmap_completed_skills += 1
        
        progress = (roadmap_completed_skills / roadmap_total_skills * 100) if roadmap_total_skills > 0 else 0
        roadmaps_progress.append({
            "id": roadmap.id,
            "title": roadmap.title,
            "progress": progress,
            "total_skills": roadmap_total_skills,
            "completed_skills": roadmap_completed_skills
        })
        total_skills += roadmap_total_skills
        completed_skills += roadmap_completed_skills

    overall_progress_percent = (completed_skills / total_skills * 100) if total_skills > 0 else 0

    response_data = {
        "user_id": current_user.id,
        "username": current_user.username,
        "roadmaps": roadmaps_progress,
        "dashboard_stats": {
            "total_skills": total_skills,
            "completed_skills": completed_skills,
            "pending_skills": total_skills - completed_skills, # Simplified pending skills
            "not_started_skills": 0, # This metric might need re-evaluation
            "progress_percent": overall_progress_percent
        },
        "skills": all_skills
    }

    print(f"Dashboard response: total_skills={total_skills}, completed_skills={completed_skills}, skills_count={len(all_skills)}")
    return response_data

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
        {"id": 1, "type": "topic", "title": "Advanced Python", "description": "Deep dive into Python's advanced features.", "progress": 0},
        {"id": 2, "type": "subtopic", "title": "Generative AI with TensorFlow", "description": "Explore building generative models.", "progress": 0},
        {"id": 3, "type": "skill", "title": "Effective Team Collaboration", "description": "Improve your teamwork and communication.", "progress": 0}
    ]
