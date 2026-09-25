from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.db.session import get_db
from app.models.domain import Challenge

router = APIRouter()

@router.get("")
def list_challenges(db: Session = Depends(get_db)):
    challenges = db.query(Challenge).all()
    return [{
        "id": c.id,
        "title": c.title,
        "problem_statement": c.problem_statement,
        "status": c.status,
        "budget_range": c.budget_range,
        "deadline": c.deadline.strftime("%Y-%m-%d") if c.deadline else ""
    } for c in challenges]

class ChallengeCreateInput(BaseModel):
    title: str
    problem_statement: str
    expected_outcome: str
    budget_range: str

@router.post("")
def create_challenge(challenge: ChallengeCreateInput, db: Session = Depends(get_db)):
    new_c = Challenge(
        title=challenge.title,
        problem_statement=challenge.problem_statement,
        expected_outcome=challenge.expected_outcome,
        budget_range=challenge.budget_range,
        status="OPEN",
        department_id=1,  # Mock department
        deadline=datetime.utcnow() + timedelta(days=30)
    )
    db.add(new_c)
    db.commit()
    db.refresh(new_c)
    return {"id": new_c.id}
