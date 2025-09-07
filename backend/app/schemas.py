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
    goal: Optional[str] = None

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
    is_email_verified: bool
    roadmaps: List[Roadmap] = []

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    refresh_token: str
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

class AIRequest(BaseModel):
    prompt: str
    context: Optional[str] = None
    model: Optional[str] = None
    temperature: Optional[float] = None
    max_tokens: Optional[int] = None

class AIResponse(BaseModel):
    response_content: str

class SkillResponse(BaseModel):
    skill_id: int
    name: str
    category: str
    difficulty: str
    status: str
    due_date: Optional[str] = None

class DashboardStats(BaseModel):
    total_skills: int
    completed_skills: int
    pending_skills: int
    not_started_skills: int
    progress_percent: float

class RoadmapProgress(BaseModel):
    id: int
    title: str
    progress: float
    total_skills: int
    completed_skills: int

class RoadmapProgress(BaseModel):
    id: int
    title: str
    progress: float
    total_skills: int
    completed_skills: int

class DashboardResponse(BaseModel):
    user_id: int
    username: str
    roadmaps: List[RoadmapProgress]
    dashboard_stats: DashboardStats
    skills: List[SkillResponse]

class RoadmapRequest(BaseModel):
    prompt: str
    context: Optional[str] = None
    model: Optional[str] = None
    temperature: Optional[float] = None
    max_tokens: Optional[int] = None

class RoadmapResponse(BaseModel):
    roadmap_data: dict

class TokenWithUser(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    user: User

__all__ = [
    "Skill",
    "SkillCreate",
    "SkillStatusUpdate",
    "Subtopic",
    "SubtopicCreate",
    "Topic",
    "TopicCreate",
    "Roadmap",
    "RoadmapCreate",
    "User",
    "UserCreate",
    "Token",
    "TokenData",
    "RoadmapGenerate",
    "AIGeneratedSkill",
    "AIGeneratedSubtopic",
    "AIGeneratedTopic",
    "AIGeneratedRoadmap",
    "AIRequest",
    "AIResponse",
    "SkillResponse",
    "DashboardStats",
    "DashboardResponse",
    "RoadmapRequest",
    "RoadmapResponse",
    "TokenWithUser",
]
