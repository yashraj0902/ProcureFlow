from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.domain import Challenge, ChallengeStatus, Pilot, PilotStatus, Application

router = APIRouter()

@router.get("/government")
def get_gov_dashboard(db: Session = Depends(get_db)):
    active_challenges = db.query(Challenge).filter(Challenge.status == ChallengeStatus.OPEN).count()
    under_evaluation = db.query(Challenge).filter(Challenge.status == ChallengeStatus.UNDER_EVALUATION).count()
    active_pilots = db.query(Pilot).filter(Pilot.status == PilotStatus.ACTIVE).count()
    
    # Using dummy values for these for now
    pending_reviews = 1
    scale_decisions = 0

    challenges = db.query(Challenge).order_by(Challenge.created_at.desc()).limit(5).all()
    
    challenge_list = []
    for c in challenges:
        challenge_list.append({
            "id": c.id,
            "title": c.title,
            "status": c.status,
            "applications": len(c.applications) if c.applications else 0,
            "deadline": c.deadline.strftime("%Y-%m-%d") if c.deadline else "",
            "created_at": c.created_at.strftime("%Y-%m-%d") if c.created_at else ""
        })

    return {
        "stats": {
            "active_challenges": active_challenges,
            "under_evaluation": under_evaluation,
            "active_pilots": active_pilots,
            "pending_reviews": pending_reviews,
            "scale_decisions": scale_decisions
        },
        "recent_challenges": challenge_list
    }

@router.get("/startup")
def get_startup_dashboard(db: Session = Depends(get_db)):
    active_applications = db.query(Application).count()
    active_pilots = db.query(Pilot).filter(Pilot.status == PilotStatus.ACTIVE).count()
    
    return {
        "stats": {
            "profile_completeness": 85,
            "recommended_challenges": 3,
            "active_applications": active_applications,
            "active_pilots": active_pilots,
            "verified_pilots": 1
        },
        "recommended": [
            {
                "title": "Predictive Maintenance for Public Buses",
                "department": "Ministry of Road Transport and Highways",
                "match": "94%",
                "deadline": "30 days"
            },
            {
                "title": "AI-Based Pothole Detection and Road Condition Monitoring",
                "department": "Ministry of Housing and Urban Affairs",
                "match": "88%",
                "deadline": "15 days"
            }
        ],
        "track_record": [
            {
                "title": "Smart Waste Management",
                "result": "Successfully demonstrated 30% route optimization across 2 municipal zones.",
                "date": "2025-11-10"
            }
        ]
    }
