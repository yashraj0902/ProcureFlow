import os
import sys
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.models.domain import User, RoleEnum, Department, Startup, Challenge, ChallengeStatus, Pilot, PilotStatus
from app.db.base import Base
from app.core.config import settings

def seed_db():
    engine = create_engine(settings.DATABASE_URL)
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    with Session(engine) as session:
        # Check if already seeded
        if session.query(User).first():
            print("Database already seeded")
            return
            
        print("Seeding database...")
        # Departments
        dept1 = Department(name="Ministry of Housing and Urban Affairs", description="Urban development")
        dept2 = Department(name="Ministry of Road Transport and Highways", description="Road safety")
        session.add_all([dept1, dept2])
        session.commit()
        
        # Users
        gov1 = User(email="government@procureflow.demo", hashed_password="hashed_password", full_name="Gov Official", role=RoleEnum.GOVERNMENT, department_id=dept1.id)
        session.add(gov1)
        
        # Startups
        startup1 = Startup(company_name="UrbanTech AI", industry="Smart Cities", dpiit_recognized=True, profile_completeness=82)
        startup2 = Startup(company_name="CivicSense", industry="Data Analytics", dpiit_recognized=True, profile_completeness=60)
        session.add_all([startup1, startup2])
        session.commit()
        
        startup_user1 = User(email="startup@procureflow.demo", hashed_password="hashed_password", full_name="Startup Founder", role=RoleEnum.STARTUP, startup_id=startup1.id)
        session.add(startup_user1)
        
        # Challenges
        challenge1 = Challenge(
            title="AI-Based Pothole Detection and Road Condition Monitoring",
            department_id=dept1.id,
            created_by_id=gov1.id,
            problem_statement="Municipal corporations need a way to detect potholes effectively without manual patrols.",
            status=ChallengeStatus.OPEN,
            deadline=datetime.now(timezone.utc) + timedelta(days=30)
        )
        session.add(challenge1)
        
        session.commit()
        print("Seeding completed.")

if __name__ == "__main__":
    seed_db()
