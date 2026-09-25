from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, List, Dict, Any
from app.models.domain import RoleEnum, ChallengeStatus, ApplicationStatus, PilotStatus

class UserBase(BaseModel):
    email: str
    full_name: str
    role: RoleEnum
    department_id: Optional[int] = None
    startup_id: Optional[int] = None

class UserOut(UserBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

class ChallengeCreate(BaseModel):
    title: str
    problem_statement: str
    expected_outcome: str
    budget_range: Optional[str] = None

class ChallengeOut(BaseModel):
    id: int
    title: str
    problem_statement: str
    expected_outcome: str
    status: ChallengeStatus
    budget_range: Optional[str] = None
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class StartupOut(BaseModel):
    id: int
    company_name: str
    industry: str
    profile_completeness: int
    model_config = ConfigDict(from_attributes=True)

class DashboardStats(BaseModel):
    active_challenges: int
    under_evaluation: int
    active_pilots: int
    pending_reviews: int
    scale_decisions: int

class StartupDashboardStats(BaseModel):
    profile_completeness: int
    recommended_challenges: int
    active_applications: int
    active_pilots: int
    verified_pilots: int
