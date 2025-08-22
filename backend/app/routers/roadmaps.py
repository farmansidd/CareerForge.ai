from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

import app.schemas as schemas
import app.crud as crud
from app.dependencies import get_db, get_current_active_user
from app.models import User
from app.services.ai_service_updated import generate_roadmap_from_goal # Import the AI service

router = APIRouter(
    prefix="/roadmaps",
    tags=["roadmaps"],
)

@router.post("/generate", response_model=schemas.Roadmap)
async def generate_roadmap(
    roadmap_generate: schemas.RoadmapGenerate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Call AI service to generate roadmap content
    ai_generated_roadmap_data = await generate_roadmap_from_goal(roadmap_generate.goal)

    if not ai_generated_roadmap_data or "title" not in ai_generated_roadmap_data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to generate roadmap from AI.")

    # Create roadmap and its hierarchy in the database
    db_roadmap = crud.create_full_roadmap_from_ai(
        db=db,
        ai_roadmap_data=schemas.AIGeneratedRoadmap(**ai_generated_roadmap_data),
        user_id=current_user.id
    )
    return db_roadmap

@router.post("/", response_model=schemas.Roadmap)
def create_roadmap(
    roadmap: schemas.RoadmapCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return crud.create_roadmap(db=db, roadmap=roadmap, user_id=current_user.id)

@router.get("/", response_model=List[schemas.Roadmap])
@router.get("", response_model=List[schemas.Roadmap])
def read_roadmaps(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return crud.get_roadmaps_by_user(db=db, user_id=current_user.id)

@router.get("/{roadmap_id}", response_model=schemas.Roadmap)
def read_roadmap(
    roadmap_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_roadmap = crud.get_roadmap(db, roadmap_id=roadmap_id)
    if db_roadmap is None:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    if db_roadmap.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this roadmap")
    return db_roadmap

# Removed create_skill_for_roadmap as skills are now primarily AI-generated

@router.put("/skills/{skill_id}", response_model=schemas.Skill)
def update_skill(
    skill_id: int,
    skill: schemas.SkillCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_skill = crud.get_skill(db, skill_id=skill_id)
    if db_skill is None:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    # Need to get the roadmap through the skill's subtopic and topic to check ownership
    db_subtopic = crud.get_subtopic(db, subtopic_id=db_skill.subtopic_id)
    if db_subtopic is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subtopic not found for skill.")
    db_topic = crud.get_topic(db, topic_id=db_subtopic.topic_id)
    if db_topic is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found for subtopic.")
    db_roadmap = crud.get_roadmap(db, roadmap_id=db_topic.roadmap_id)

    if db_roadmap.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this skill")
    return crud.update_skill(db=db, skill_id=skill_id, skill=skill)

@router.delete("/skills/{skill_id}", response_model=schemas.Skill)
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_skill = crud.get_skill(db, skill_id=skill_id)
    if db_skill is None:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    # Need to get the roadmap through the skill's subtopic and topic to check ownership
    db_subtopic = crud.get_subtopic(db, subtopic_id=db_skill.subtopic_id)
    if db_subtopic is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subtopic not found for skill.")
    db_topic = crud.get_topic(db, topic_id=db_subtopic.topic_id)
    if db_topic is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found for subtopic.")
    db_roadmap = crud.get_roadmap(db, roadmap_id=db_topic.roadmap_id)

    if db_roadmap.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this skill")
    return crud.delete_skill(db=db, skill_id=skill_id)

@router.put("/{skill_id}/status", response_model=schemas.Skill)
def update_skill_status(
    skill_id: int,
    skill_status: schemas.SkillStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_skill = crud.get_skill(db, skill_id=skill_id)
    if db_skill is None:
        raise HTTPException(status_code=404, detail="Skill not found")

    # Need to get the roadmap through the skill's subtopic and topic to check ownership
    db_subtopic = crud.get_subtopic(db, subtopic_id=db_skill.subtopic_id)
    if db_subtopic is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subtopic not found for skill.")
    db_topic = crud.get_topic(db, topic_id=db_subtopic.topic_id)
    if db_topic is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found for subtopic.")
    db_roadmap = crud.get_roadmap(db, roadmap_id=db_topic.roadmap_id)

    if db_roadmap.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this skill")
    return crud.update_skill_status(db=db, skill_id=skill_id, status=skill_status.status)