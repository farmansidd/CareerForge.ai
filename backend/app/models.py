from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"  

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    roadmaps = relationship("Roadmap", back_populates="owner")

class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, index=True) # Changed to Text for potentially longer descriptions
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="roadmaps")
    topics = relationship("Topic", back_populates="roadmap") # New relationship to Topics

class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text, index=True) # Changed to Text
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id"))

    roadmap = relationship("Roadmap", back_populates="topics")
    subtopics = relationship("Subtopic", back_populates="topic") # New relationship to Subtopics

class Subtopic(Base):
    __tablename__ = "subtopics"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text, index=True) # Changed to Text
    topic_id = Column(Integer, ForeignKey("topics.id"))

    topic = relationship("Topic", back_populates="subtopics")
    skills = relationship("Skill", back_populates="subtopic") # New relationship to Skills

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True) # Keep category for potential filtering/grouping
    estimated_hours = Column(Integer)
    difficulty = Column(String)
    due_date = Column(String, nullable=True) # Make nullable as it might not always be set initially
    status = Column(String, default='pending')
    subtopic_id = Column(Integer, ForeignKey("subtopics.id")) # Changed from roadmap_id

    subtopic = relationship("Subtopic", back_populates="skills") # Changed from roadmap
