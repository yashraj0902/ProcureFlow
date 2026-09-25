import os

content = """from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.session import get_db
from app.models.domain import Pilot, KPI, KPIObservation, Challenge, Startup

router = APIRouter()

@router.get("")
def list_pilots(db: Session = Depends(get_db)):
    pilots = db.query(Pilot).all()
    # We shouldn't use p.startup and p.challenge directly if they aren't loaded properly
    # Let's fetch manually to be safe.
    result = []
    for p in pilots:
        startup = db.query(Startup).filter(Startup.id == p.startup_id).first()
        challenge = db.query(Challenge).filter(Challenge.id == p.challenge_id).first()
        result.append({
            "id": p.id,
            "name": p.name,
            "status": p.status,
            "start_date": p.start_date.strftime("%Y-%m-%d") if p.start_date else "",
            "end_date": p.end_date.strftime("%Y-%m-%d") if p.end_date else "",
            "startup_name": startup.company_name if startup else "Unknown",
            "challenge_title": challenge.title if challenge else "Unknown"
        })
    return result

@router.get("/{pilot_id}")
def get_pilot_details(pilot_id: int, db: Session = Depends(get_db)):
    pilot = db.query(Pilot).filter(Pilot.id == pilot_id).first()
    if not pilot:
        raise HTTPException(status_code=404, detail="Pilot not found")
        
    startup = db.query(Startup).filter(Startup.id == pilot.startup_id).first()
    challenge = db.query(Challenge).filter(Challenge.id == pilot.challenge_id).first()
    
    # Fetch KPIs for this challenge
    kpis = db.query(KPI).filter(KPI.challenge_id == pilot.challenge_id).all()
    
    kpi_results = []
    for k in kpis:
        # Fetch observations for this KPI and Pilot
        obs = db.query(KPIObservation).filter(
            KPIObservation.kpi_id == k.id,
            KPIObservation.pilot_id == pilot.id
        ).order_by(KPIObservation.created_at.desc()).all()
        
        current_value = obs[0].raw_value if obs else 0
        target_val = float(k.target.replace('%', '').replace('<', '').replace('>', '').strip()) if k.target else 0
        baseline_val = float(k.baseline.replace('%', '').replace('<', '').replace('>', '').strip()) if k.baseline else 0
        
        # Calculate achievement percentage based on direction
        achievement = 0
        status = "NO_DATA"
        
        if obs:
            if k.direction == "HIGHER_IS_BETTER":
                if current_value >= target_val:
                    status = "ACHIEVED"
                    achievement = 100
                elif current_value > baseline_val:
                    status = "ON_TRACK"
                    # simple interpolation
                    range_val = target_val - baseline_val
                    achievement = min(100, max(0, int(((current_value - baseline_val) / range_val) * 100))) if range_val else 100
                else:
                    status = "AT_RISK"
                    achievement = 0
            else: # LOWER_IS_BETTER
                if current_value <= target_val:
                    status = "ACHIEVED"
                    achievement = 100
                elif current_value < baseline_val:
                    status = "ON_TRACK"
                    range_val = baseline_val - target_val
                    achievement = min(100, max(0, int(((baseline_val - current_value) / range_val) * 100))) if range_val else 100
                else:
                    status = "AT_RISK"
                    achievement = 0
                    
        history = [{"value": o.raw_value, "date": o.created_at.strftime("%Y-%m-%d") if o.created_at else ""} for o in reversed(obs)]
        
        kpi_results.append({
            "id": k.id,
            "name": k.name,
            "unit": k.unit,
            "direction": k.direction,
            "baseline": k.baseline,
            "target": k.target,
            "current": current_value,
            "achievement": achievement,
            "status": status,
            "history": history
        })
        
    return {
        "id": pilot.id,
        "name": pilot.name,
        "status": pilot.status,
        "startup": {"id": startup.id, "name": startup.company_name} if startup else None,
        "challenge": {"id": challenge.id, "title": challenge.title} if challenge else None,
        "kpis": kpi_results
    }

class ObservationInput(BaseModel):
    raw_value: float
    notes: Optional[str] = None

@router.post("/{pilot_id}/kpis/{kpi_id}/observations")
def add_observation(pilot_id: int, kpi_id: int, obs: ObservationInput, db: Session = Depends(get_db)):
    new_obs = KPIObservation(
        kpi_id=kpi_id,
        pilot_id=pilot_id,
        raw_value=obs.raw_value,
        notes=obs.notes,
        submitted_by=1 # Mock user
    )
    db.add(new_obs)
    db.commit()
    return {"status": "success", "message": "Observation added"}

"""

with open("backend/app/api/endpoints/pilots.py", "w") as f:
    f.write(content)
