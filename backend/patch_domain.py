from app.db.session import engine
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum, func
from app.models.domain import Base
import enum

class DecisionOutcome(str, enum.Enum):
    SCALE = "SCALE"
    MODIFY = "MODIFY"
    STOP = "STOP"

class Decision(Base):
    __tablename__ = "decisions"
    id = Column(Integer, primary_key=True, index=True)
    pilot_id = Column(Integer, ForeignKey("pilots.id"))
    startup_id = Column(Integer, ForeignKey("startups.id"))
    challenge_id = Column(Integer, ForeignKey("challenges.id"))
    outcome = Column(String)
    rationale = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

Base.metadata.create_all(bind=engine)
