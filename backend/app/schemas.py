from pydantic import BaseModel
from typing import List, Optional

class SkillBase(BaseModel):
    name: str
    description: Optional[str] = None # Added description
    estimated_hours: int
    difficulty: str

class SkillCreate(SkillBase):
    pass

class Skill(SkillBase):
    id: int
    status: str
    subtopic_id: int

    class Config:
        from_attributes = True

class SkillStatusUpdate(BaseModel):
    status: str

class SubtopicBase(BaseModel):
    name: str
    description: Optional[str] = None

class SubtopicCreate(SubtopicBase):
    pass

class Subtopic(SubtopicBase):
    id: int
    topic_id: int
    skills: List[Skill] = []

    class Config:
        from_attributes = True

class TopicBase(BaseModel):
    name: str
    description: Optional[str] = None

class TopicCreate(TopicBase):
    pass

class Topic(TopicBase):
    id: int
    roadmap_id: int
    subtopics: List[Subtopic] = []

    class Config:
        from_attributes = True

class RoadmapBase(BaseModel):
    title: str
    description: Optional[str] = None

class RoadmapCreate(RoadmapBase):
    pass

class Roadmap(RoadmapBase):
    id: int
    owner_id: int
    topics: List[Topic] = []

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    roadmaps: List[Roadmap] = []

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class RoadmapGenerate(BaseModel):
    goal: str

# Schema for AI-generated roadmap input
class AIGeneratedSkill(BaseModel):
    name: str
    description: Optional[str] = None
    estimated_hours: int
    difficulty: str

class AIGeneratedSubtopic(BaseModel):
    name: str
    description: Optional[str] = None
    skills: List[AIGeneratedSkill]

class AIGeneratedTopic(BaseModel):
    name: str
    description: Optional[str] = None
    subtopics: List[AIGeneratedSubtopic]

class AIGeneratedRoadmap(BaseModel):
    title: str
    description: Optional[str] = None
    topics: List[AIGeneratedTopic]
