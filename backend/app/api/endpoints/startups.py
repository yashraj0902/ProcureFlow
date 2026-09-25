from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.domain import Startup

router = APIRouter()

@router.get("")
def list_startups(db: Session = Depends(get_db)):
    startups = db.query(Startup).all()
    return [{
        "id": s.id,
        "company_name": s.company_name,
        "industry": s.industry,
        "dpiit_recognized": s.dpiit_recognized,
        "profile_completeness": s.profile_completeness,
        "description": s.description
    } for s in startups]
