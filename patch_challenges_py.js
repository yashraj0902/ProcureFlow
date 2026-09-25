const fs = require('fs');
const path = 'backend/app/api/endpoints/challenges.py';
let content = fs.readFileSync(path, 'utf8');

const importReplacement = `from fastapi import APIRouter, Depends\nfrom pydantic import BaseModel\nfrom typing import Optional\nfrom sqlalchemy.orm import Session\nfrom datetime import datetime, timedelta\nfrom app.db.session import get_db\nfrom app.models.domain import Challenge`;

content = content.replace("from fastapi import APIRouter, Depends\nfrom sqlalchemy.orm import Session\nfrom app.db.session import get_db\nfrom app.models.domain import Challenge", importReplacement);

const newEndpoint = `
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
`;

content += newEndpoint;

fs.writeFileSync(path, content);
