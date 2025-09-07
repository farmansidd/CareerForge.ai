from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text, CheckConstraint, DateTime, event
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base
from app.core.encrypted_types import EncryptedString
import hashlib

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(EncryptedString, unique=True, index=True)
    email_hash = Column(String, unique=True, index=True) # For indexing and searching encrypted emails
    hashed_password = Column(String)
    is_email_verified = Column(Boolean, default=False)

    roadmaps = relationship("Roadmap", back_populates="owner")

# Event listener to hash email before insert/update
@event.listens_for(User.email, 'set')
def receive_email_set(target, value, oldvalue, initiator):
    if value is not None:
        target.email_hash = hashlib.sha256(value.encode()).hexdigest()

class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, index=True)
    goal = Column(Text, index=True, nullable=True) # Add goal field
    owner_id = Column(Integer, ForeignKey("users.id"))
    ai_generated_content = Column(Text, nullable=True)

    owner = relationship("User", back_populates="roadmaps")
    topics = relationship("Topic", back_populates="roadmap")

class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text, index=True)
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id"))

    roadmap = relationship("Roadmap", back_populates="topics")
    subtopics = relationship("Subtopic", back_populates="topic")

class Subtopic(Base):
    __tablename__ = "subtopics"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text, index=True)
    topic_id = Column(Integer, ForeignKey("topics.id"))

    topic = relationship("Topic", back_populates="subtopics")
    skills = relationship("Skill", back_populates="subtopic")

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True)
    estimated_hours = Column(Integer)
    difficulty = Column(String)
    due_date = Column(String, nullable=True)
    status = Column(String, default='pending')
    subtopic_id = Column(Integer, ForeignKey("subtopics.id"))

    subtopic = relationship("Subtopic", back_populates="skills")

class AIResponse(Base):
    __tablename__ = "ai_responses"

    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(Integer, nullable=True)
    skill_name = Column(String, nullable=False)
    status = Column(String, nullable=False)
    response_content = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    user = relationship("User")

    __table_args__ = (
        CheckConstraint("status IN ('completed', 'pending')", name='status_check'),
    )

class TokenBlocklist(Base):
    __tablename__ = "token_blocklist"

    id = Column(Integer, primary_key=True, index=True)
    jti = Column(String, nullable=False, index=True)
    created_at = Column(DateTime, server_default=func.now())
