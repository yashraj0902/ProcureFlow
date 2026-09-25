content = """
@router.get("/all/decisions")
def get_all_decisions(db: Session = Depends(get_db)):
    decisions = db.query(Decision).order_by(Decision.created_at.desc()).all()
    res = []
    for d in decisions:
        startup = db.query(Startup).filter(Startup.id == d.startup_id).first()
        challenge = db.query(Challenge).filter(Challenge.id == d.challenge_id).first()
        pilot = db.query(Pilot).filter(Pilot.id == d.pilot_id).first()
        res.append({
            "id": d.id,
            "outcome": d.outcome,
            "rationale": d.rationale,
            "date": d.created_at.strftime("%Y-%m-%d") if d.created_at else "Today",
            "startup": startup.company_name if startup else "Unknown",
            "challenge": challenge.title if challenge else "Unknown",
            "pilot_name": pilot.name if pilot else "Unknown Pilot"
        })
    return res
"""

with open("backend/app/api/endpoints/pilots.py", "a") as f:
    f.write(content)
