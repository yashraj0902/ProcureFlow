from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.db.session import get_db
from app.models.domain import Challenge, KPI, KPIStatus, KPIObservation

router = APIRouter()

# Mock AI Generation - rule based on challenge problem statement keywords
@router.post("/{challenge_id}/recommend")
def recommend_kpis(challenge_id: int, db: Session = Depends(get_db)):
    challenge = db.query(Challenge).filter(Challenge.id == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
        
    text = (challenge.problem_statement or "").lower() + " " + (challenge.title or "").lower()
    
    recommendations = []
    if "pothole" in text or "road" in text or "maintenance" in text:
        recommendations.extend([
            {
                "name": "Detection Accuracy",
                "category": "Technical Performance",
                "unit": "Percentage",
                "baseline": "60%",
                "target": "90%",
                "direction": "HIGHER_IS_BETTER",
                "measurement_method": "Comparison with ground-truth manual inspection",
                "measurement_frequency": "Weekly",
                "data_source": "MANUAL_ENTRY",
                "source_type": "AI Analysis",
                "reason": "Accurate detection is the core requirement for automated road monitoring."
            },
            {
                "name": "False Positive Rate",
                "category": "Reliability",
                "unit": "Percentage",
                "baseline": "20%",
                "target": "< 5%",
                "direction": "LOWER_IS_BETTER",
                "measurement_method": "Count of non-potholes flagged as potholes",
                "measurement_frequency": "Weekly",
                "data_source": "MANUAL_ENTRY",
                "source_type": "Historical Pilot Reference",
                "reason": "High false positives will waste municipal resources sending repair crews to intact roads."
            }
        ])
    elif "waste" in text or "segregation" in text:
         recommendations.extend([
            {
                "name": "Segregation Accuracy",
                "category": "Technical Performance",
                "unit": "Percentage",
                "baseline": "45%",
                "target": "85%",
                "direction": "HIGHER_IS_BETTER",
                "measurement_method": "Sample weight of correctly segregated waste vs total",
                "measurement_frequency": "Daily",
                "data_source": "MANUAL_ENTRY",
                "source_type": "AI Analysis",
                "reason": "Measures the direct operational impact of the automated sorting."
            }
        ])
    else:
        # Generic
        recommendations.extend([
            {
                "name": "System Uptime",
                "category": "Reliability",
                "unit": "Percentage",
                "baseline": "0%",
                "target": "99.9%",
                "direction": "HIGHER_IS_BETTER",
                "measurement_method": "System logs",
                "measurement_frequency": "Daily",
                "data_source": "SYSTEM_METRIC",
                "source_type": "KPI Template",
                "reason": "Standard requirement for any software or IoT platform deployed by the government."
            },
             {
                "name": "User Adoption Rate",
                "category": "Adoption",
                "unit": "Percentage",
                "baseline": "0%",
                "target": "80%",
                "direction": "HIGHER_IS_BETTER",
                "measurement_method": "Active users vs Total eligible users",
                "measurement_frequency": "Weekly",
                "data_source": "SYSTEM_METRIC",
                "source_type": "AI Analysis",
                "reason": "Ensures the solution is actually usable by target beneficiaries or officers."
            }
        ])
        
    return {"recommendations": recommendations}

@router.post("/{challenge_id}/approve")
def approve_kpis(challenge_id: int, kpis: List[Dict[str, Any]], db: Session = Depends(get_db)):
    challenge = db.query(Challenge).filter(Challenge.id == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
        
    created_kpis = []
    for k_data in kpis:
        kpi = KPI(
            challenge_id=challenge_id,
            name=k_data.get("name"),
            description=k_data.get("description", ""),
            category=k_data.get("category"),
            unit=k_data.get("unit"),
            baseline=k_data.get("baseline"),
            target=k_data.get("target"),
            direction=k_data.get("direction", "HIGHER_IS_BETTER"),
            measurement_method=k_data.get("measurement_method"),
            measurement_frequency=k_data.get("measurement_frequency"),
            data_source=k_data.get("data_source"),
            source_type=k_data.get("source_type", "GOVERNMENT_DEFINED"),
            reason=k_data.get("reason"),
            status=KPIStatus.APPROVED.value
        )
        db.add(kpi)
        created_kpis.append(kpi)
        
    db.commit()
    return {"status": "success", "message": f"Approved {len(created_kpis)} KPIs"}

@router.get("/{challenge_id}")
def get_challenge_kpis(challenge_id: int, db: Session = Depends(get_db)):
    kpis = db.query(KPI).filter(KPI.challenge_id == challenge_id).all()
    return [{
        "id": k.id,
        "name": k.name,
        "category": k.category,
        "target": k.target,
        "baseline": k.baseline,
        "unit": k.unit,
        "source_type": k.source_type,
        "reason": k.reason
    } for k in kpis]
