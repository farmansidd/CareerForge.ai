from sqlalchemy.orm import Session, joinedload
import app.models as models
import app.schemas as schemas
from app.core.security import get_password_hash

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_roadmap(db: Session, roadmap_id: int):
    return db.query(models.Roadmap).options(
        joinedload(models.Roadmap.topics).joinedload(models.Topic.subtopics).joinedload(models.Subtopic.skills)
    ).filter(models.Roadmap.id == roadmap_id).first()

def get_roadmaps_by_user(db: Session, user_id: int):
    return db.query(models.Roadmap).options(
        joinedload(models.Roadmap.topics).joinedload(models.Topic.subtopics).joinedload(models.Subtopic.skills)
    ).filter(models.Roadmap.owner_id == user_id).all()

def create_roadmap(db: Session, roadmap: schemas.RoadmapCreate, user_id: int):
    db_roadmap = models.Roadmap(**roadmap.dict(), owner_id=user_id)
    db.add(db_roadmap)
    db.commit()
    db.refresh(db_roadmap)
    return db_roadmap

def create_topic(db: Session, topic: schemas.TopicCreate, roadmap_id: int):
    db_topic = models.Topic(**topic.dict(), roadmap_id=roadmap_id)
    db.add(db_topic)
    db.commit()
    db.refresh(db_topic)
    return db_topic

def get_topic(db: Session, topic_id: int):
    return db.query(models.Topic).options(
        joinedload(models.Topic.subtopics).joinedload(models.Subtopic.skills)
    ).filter(models.Topic.id == topic_id).first()

def get_topics_by_roadmap(db: Session, roadmap_id: int):
    return db.query(models.Topic).filter(models.Topic.roadmap_id == roadmap_id).all()

def create_subtopic(db: Session, subtopic: schemas.SubtopicCreate, topic_id: int):
    db_subtopic = models.Subtopic(**subtopic.dict(), topic_id=topic_id)
    db.add(db_subtopic)
    db.commit()
    db.refresh(db_subtopic)
    return db_subtopic

def get_subtopic(db: Session, subtopic_id: int):
    return db.query(models.Subtopic).options(
        joinedload(models.Subtopic.skills)
    ).filter(models.Subtopic.id == subtopic_id).first()

def get_subtopics_by_topic(db: Session, topic_id: int):
    return db.query(models.Subtopic).filter(models.Subtopic.topic_id == topic_id).all()

def create_skill(db: Session, skill: schemas.SkillCreate, subtopic_id: int):
    db_skill = models.Skill(**skill.dict(), subtopic_id=subtopic_id)
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

def get_skill(db: Session, skill_id: int):
    return db.query(models.Skill).filter(models.Skill.id == skill_id).first()

def update_skill(db: Session, skill_id: int, skill: schemas.SkillCreate):
    db_skill = get_skill(db, skill_id)
    if db_skill:
        for key, value in skill.dict(exclude_unset=True).items(): # Use exclude_unset to only update provided fields
            setattr(db_skill, key, value)
        db.commit()
        db.refresh(db_skill)
    return db_skill

def update_skill_status(db: Session, skill_id: int, status: str):
    db_skill = get_skill(db, skill_id)
    if db_skill:
        db_skill.status = status
        db.commit()
        db.refresh(db_skill)
    return db_skill

def delete_skill(db: Session, skill_id: int):
    db_skill = get_skill(db, skill_id)
    if db_skill:
        db.delete(db_skill)
        db.commit()
    return db_skill

def create_full_roadmap_from_ai(db: Session, ai_roadmap_data: schemas.AIGeneratedRoadmap, user_id: int):
    # Create Roadmap
    db_roadmap = models.Roadmap(
        title=ai_roadmap_data.title,
        description=ai_roadmap_data.description,
        owner_id=user_id
    )
    db.add(db_roadmap)
    db.flush() # Flush to get db_roadmap.id

    for topic_data in ai_roadmap_data.topics:
        # Create Topic
        db_topic = models.Topic(
            name=topic_data.name,
            description=topic_data.description,
            roadmap_id=db_roadmap.id
        )
        db.add(db_topic)
        db.flush() # Flush to get db_topic.id

        for subtopic_data in topic_data.subtopics:
            # Create Subtopic
            db_subtopic = models.Subtopic(
                name=subtopic_data.name,
                description=subtopic_data.description,
                topic_id=db_topic.id
            )
            db.add(db_subtopic)
            db.flush() # Flush to get db_subtopic.id

            for skill_data in subtopic_data.skills:
                # Create Skill
                db_skill = models.Skill(
                    name=skill_data.name,
                    category=skill_data.description,  # Use description as category
                    estimated_hours=skill_data.estimated_hours,
                    difficulty=skill_data.difficulty,
                    subtopic_id=db_subtopic.id,
                    status="not_started"  # Default status
                )
                db.add(db_skill)
    
    db.commit()
    # After committing, the db_roadmap object is expired. 
    # We need to query it again to get the fully loaded object with relationships.
    return get_roadmap(db, db_roadmap.id)
