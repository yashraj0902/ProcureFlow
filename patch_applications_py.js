const fs = require('fs');
const path = 'backend/app/api/endpoints/applications.py';
let content = fs.readFileSync(path, 'utf8');

const importReplacement = `from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.domain import Application, ApplicationStatus, Startup, Challenge, Department

router = APIRouter()

class ApplicationCreateInput(BaseModel):
    challenge_id: int
    technical_approach: str
    experience: str
    budget: str
    timeline: str

@router.post("")
def create_application(app_in: ApplicationCreateInput, db: Session = Depends(get_db)):
    new_app = Application(
        challenge_id=app_in.challenge_id,
        startup_id=1,  # Mock startup ID
        proposal_summary=app_in.technical_approach,
        status=ApplicationStatus.SUBMITTED,
        match_score=85.0
    )
    db.add(new_app)
    db.commit()
    return {"status": "success"}

@router.get("")
def list_applications(db: Session = Depends(get_db)):
    apps = db.query(Application).all()
    result = []
    for app in apps:
        challenge = db.query(Challenge).filter(Challenge.id == app.challenge_id).first()
        dept_name = "Unknown Department"
        if challenge and challenge.department_id:
            dept = db.query(Department).filter(Department.id == challenge.department_id).first()
            if dept:
                dept_name = dept.name
                
        result.append({
            "id": app.id,
            "challenge": challenge.title if challenge else "Unknown Challenge",
            "department": dept_name,
            "status": app.status,
            "submitted_on": app.created_at.strftime("%Y-%m-%d") if app.created_at else "2026-09-25",
            "score": f"{app.match_score}% Match"
        })
    return result
`;

content = content.replace("router = APIRouter()", importReplacement);

fs.writeFileSync(path, content);
