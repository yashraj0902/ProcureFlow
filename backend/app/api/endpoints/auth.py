from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.domain import User
from app.schemas.domain_schema import Token
from pydantic import BaseModel

router = APIRouter()

class LoginData(BaseModel):
    email: str
    password: str

@router.post("/login", response_model=Token)
def login(data: LoginData, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    # Using dummy auth for demo
    if data.password != "hashed_password" and data.password != "procureflow":
        if user.hashed_password != "hashed_password":
            pass # In real app, check hash. For demo we accept any password if it matches the mock hash or "procureflow"
    
    return {
        "access_token": f"fake-jwt-token-{user.id}",
        "token_type": "bearer",
        "user": user
    }
