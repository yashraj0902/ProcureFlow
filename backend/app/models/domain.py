from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float, JSON, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.db.base import Base

class RoleEnum(str, enum.Enum):
    GOVERNMENT = "GOVERNMENT"
    STARTUP = "STARTUP"

class ChallengeStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    OPEN = "OPEN"
    UNDER_EVALUATION = "UNDER_EVALUATION"
    SHORTLISTED = "SHORTLISTED"
    PILOT = "PILOT"
    COMPLETED = "COMPLETED"
    SCALE_REVIEW = "SCALE_REVIEW"
    SCALED = "SCALED"
    MODIFIED = "MODIFIED"
    STOPPED = "STOPPED"
    CLOSED = "CLOSED"

class ApplicationStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    SUBMITTED = "SUBMITTED"
    UNDER_REVIEW = "UNDER_REVIEW"
    SHORTLISTED = "SHORTLISTED"
    REJECTED = "REJECTED"
    PILOT_INVITED = "PILOT_INVITED"

class PilotStatus(str, enum.Enum):
    PLANNED = "PLANNED"
    ACTIVE = "ACTIVE"
    AT_RISK = "AT_RISK"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class MilestoneStatus(str, enum.Enum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    SUBMITTED = "SUBMITTED"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    OVERDUE = "OVERDUE"

class KPIStatus(str, enum.Enum):
    ON_TRACK = "ON_TRACK"
    AT_RISK = "AT_RISK"
    BELOW_TARGET = "BELOW_TARGET"
    ACHIEVED = "ACHIEVED"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    role = Column(Enum(RoleEnum), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    startup_id = Column(Integer, ForeignKey("startups.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)

class Startup(Base):
    __tablename__ = "startups"
    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, nullable=False)
    description = Column(Text)
    industry = Column(String)
    founded_year = Column(Integer)
    location = Column(String)
    dpiit_recognized = Column(Boolean, default=False)
    integrity_status = Column(String, default="CLEAR") # CLEAR, REVIEW_REQUIRED, FLAGGED
    profile_completeness = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Challenge(Base):
    __tablename__ = "challenges"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"))
    created_by_id = Column(Integer, ForeignKey("users.id"))
    problem_statement = Column(Text)
    expected_outcome = Column(Text)
    status = Column(Enum(ChallengeStatus), default=ChallengeStatus.DRAFT)
    budget_range = Column(String)
    deadline = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    applications = relationship("Application", back_populates="challenge")
    department = relationship("Department")

class Application(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    challenge_id = Column(Integer, ForeignKey("challenges.id"))
    startup_id = Column(Integer, ForeignKey("startups.id"))
    proposal_summary = Column(Text)
    technical_solution = Column(Text)
    status = Column(Enum(ApplicationStatus), default=ApplicationStatus.SUBMITTED)
    match_score = Column(Float, default=0.0)
    match_analysis = Column(JSON) # AI explanation
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    challenge = relationship("Challenge", back_populates="applications")
    startup = relationship("Startup")

class Evaluation(Base):
    __tablename__ = "evaluations"
    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"))
    evaluator_id = Column(Integer, ForeignKey("users.id"))
    scores = Column(JSON) # e.g. {"Technical": 8, "Feasibility": 7}
    total_score = Column(Float)
    comments = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Pilot(Base):
    __tablename__ = "pilots"
    id = Column(Integer, primary_key=True, index=True)
    challenge_id = Column(Integer, ForeignKey("challenges.id"))
    startup_id = Column(Integer, ForeignKey("startups.id"))
    name = Column(String)
    status = Column(Enum(PilotStatus), default=PilotStatus.PLANNED)
    start_date = Column(DateTime(timezone=True))
    end_date = Column(DateTime(timezone=True))
    milestones = relationship("PilotMilestone", back_populates="pilot")
    kpis = relationship("PilotKPI", back_populates="pilot")
    challenge = relationship("Challenge")
    startup = relationship("Startup")

class PilotMilestone(Base):
    __tablename__ = "pilot_milestones"
    id = Column(Integer, primary_key=True, index=True)
    pilot_id = Column(Integer, ForeignKey("pilots.id"))
    title = Column(String)
    description = Column(Text)
    due_date = Column(DateTime(timezone=True))
    status = Column(Enum(MilestoneStatus), default=MilestoneStatus.PENDING)
    pilot = relationship("Pilot", back_populates="milestones")

class PilotKPI(Base):
    __tablename__ = "pilot_kpis"
    id = Column(Integer, primary_key=True, index=True)
    pilot_id = Column(Integer, ForeignKey("pilots.id"))
    name = Column(String)
    target_value = Column(Float)
    current_value = Column(Float, default=0)
    unit = Column(String)
    status = Column(Enum(KPIStatus), default=KPIStatus.ON_TRACK)
    pilot = relationship("Pilot", back_populates="kpis")

class TrackRecord(Base):
    __tablename__ = "track_records"
    id = Column(Integer, primary_key=True, index=True)
    startup_id = Column(Integer, ForeignKey("startups.id"))
    pilot_id = Column(Integer, ForeignKey("pilots.id"))
    department_name = Column(String)
    challenge_title = Column(String)
    achieved_results = Column(Text)
    validation_status = Column(String) # Validated
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    startup = relationship("Startup")

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(String)
    read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

import enum
from sqlalchemy import Enum as SQLEnum

class KPIStatus(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"

class KPI(Base):
    __tablename__ = "kpis"
    
    id = Column(Integer, primary_key=True, index=True)
    challenge_id = Column(Integer, ForeignKey("challenges.id"))
    pilot_id = Column(Integer, ForeignKey("pilots.id"), nullable=True)
    
    name = Column(String)
    description = Column(String)
    category = Column(String)
    unit = Column(String)
    baseline = Column(String, nullable=True)
    target = Column(String)
    direction = Column(String) # HIGHER_IS_BETTER, LOWER_IS_BETTER
    measurement_method = Column(String)
    measurement_frequency = Column(String)
    data_source = Column(String)
    
    source_type = Column(String) # AI_SUGGESTED, GOVERNMENT_DEFINED
    reason = Column(String, nullable=True)
    
    status = Column(String, default=KPIStatus.APPROVED.value)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class KPIObservation(Base):
    __tablename__ = "kpi_observations"
    
    id = Column(Integer, primary_key=True, index=True)
    kpi_id = Column(Integer, ForeignKey("kpis.id"))
    pilot_id = Column(Integer, ForeignKey("pilots.id"))
    
    raw_value = Column(Float)
    notes = Column(String, nullable=True)
    submitted_by = Column(Integer, ForeignKey("users.id"))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class DecisionOutcome(str, enum.Enum):
    SCALE = "SCALE"
    MODIFY = "MODIFY"
    STOP = "STOP"

class Decision(Base):
    __tablename__ = "decisions"
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, index=True)
    pilot_id = Column(Integer, ForeignKey("pilots.id"))
    startup_id = Column(Integer, ForeignKey("startups.id"))
    challenge_id = Column(Integer, ForeignKey("challenges.id"))
    outcome = Column(String)
    rationale = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
