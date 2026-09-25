import os
import sys
from datetime import datetime, timedelta, timezone
import random
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.models.domain import User, RoleEnum, Department, Startup, Challenge, ChallengeStatus, Pilot, PilotStatus, Application, ApplicationStatus, TrackRecord
from app.core.config import settings

def seed_more_data():
    engine = create_engine(settings.DATABASE_URL)
    with Session(engine) as session:
        print("Adding extended dummy data...")
        
        # Get existing departments or create them
        dept_mhua = session.query(Department).filter_by(name="Ministry of Housing and Urban Affairs").first()
        dept_morth = session.query(Department).filter_by(name="Ministry of Road Transport and Highways").first()
        
        dept_edu = Department(name="Ministry of Education", description="Education and skill development")
        dept_health = Department(name="Ministry of Health", description="Public health and sanitation")
        session.add_all([dept_edu, dept_health])
        session.commit()
        
        gov_user = session.query(User).filter_by(role=RoleEnum.GOVERNMENT).first()
        if not gov_user:
            gov_user = User(email="government2@procureflow.demo", hashed_password="hashed_password", full_name="Gov Official", role=RoleEnum.GOVERNMENT, department_id=dept_mhua.id)
            session.add(gov_user)
            session.commit()
            
        # Add more Startups
        startups_data = [
            {"name": "GovTech Solutions", "industry": "E-Governance", "profile": 90},
            {"name": "EduChain", "industry": "Education Tech", "profile": 75},
            {"name": "MedPredict", "industry": "Healthcare Analytics", "profile": 85},
            {"name": "SwachhSystems", "industry": "Sanitation", "profile": 65},
            {"name": "TransitFlow", "industry": "Transportation", "profile": 95},
        ]
        
        startups = []
        for s_data in startups_data:
            startup = Startup(
                company_name=s_data["name"],
                industry=s_data["industry"],
                dpiit_recognized=True,
                profile_completeness=s_data["profile"],
                description=f"Innovative {s_data['industry']} solutions for public sector."
            )
            session.add(startup)
            startups.append(startup)
        
        session.commit()

        # Add more Challenges
        challenges_data = [
            {
                "title": "Predictive Maintenance for Public Buses",
                "dept": dept_morth,
                "problem": "Frequent breakdowns in public transport fleet causing delays and high maintenance costs.",
                "outcome": "A predictive system to alert maintenance needs 2 weeks in advance.",
                "status": ChallengeStatus.UNDER_EVALUATION
            },
            {
                "title": "Digital Tracking of Mid-Day Meals",
                "dept": dept_edu,
                "problem": "Lack of transparency in distribution and quality monitoring of school meals.",
                "outcome": "End-to-end tracking system using computer vision or mobile tech.",
                "status": ChallengeStatus.OPEN
            },
            {
                "title": "AI-Powered Diagnostic Assistance in Rural Clinics",
                "dept": dept_health,
                "problem": "Shortage of specialized doctors in rural primary health centers.",
                "outcome": "Diagnostic tool to assist nurses with preliminary screening.",
                "status": ChallengeStatus.PILOT
            },
            {
                "title": "Automated Waste Segregation at Source",
                "dept": dept_mhua,
                "problem": "Low compliance with dry/wet waste segregation guidelines.",
                "outcome": "Smart bins or community-level automated sorting mechanisms.",
                "status": ChallengeStatus.COMPLETED
            }
        ]
        
        challenges = []
        for c_data in challenges_data:
            chal = Challenge(
                title=c_data["title"],
                department_id=c_data["dept"].id,
                created_by_id=gov_user.id,
                problem_statement=c_data["problem"],
                expected_outcome=c_data["outcome"],
                status=c_data["status"],
                deadline=datetime.now(timezone.utc) + timedelta(days=random.randint(10, 45)),
                budget_range="10L - 50L"
            )
            session.add(chal)
            challenges.append(chal)
            
        session.commit()
        
        # Add Pilots
        pilot1 = Pilot(
            challenge_id=challenges[2].id,
            startup_id=startups[2].id,
            name="Rural Clinic AI Diagnostic Pilot",
            status=PilotStatus.ACTIVE,
            start_date=datetime.now(timezone.utc) - timedelta(days=15),
            end_date=datetime.now(timezone.utc) + timedelta(days=75)
        )
        session.add(pilot1)
        
        # Add Applications
        app1 = Application(
            challenge_id=challenges[1].id,
            startup_id=startups[1].id,
            proposal_summary="Blockchain based ledger for meal tracking",
            status=ApplicationStatus.SUBMITTED,
            match_score=88.5
        )
        app2 = Application(
            challenge_id=challenges[0].id,
            startup_id=startups[4].id,
            proposal_summary="IoT sensors for engine telemetry",
            status=ApplicationStatus.UNDER_REVIEW,
            match_score=94.2
        )
        session.add_all([app1, app2])
        
        # Add Track Record
        record1 = TrackRecord(
            startup_id=startups[3].id,
            pilot_id=None, # Completed before ProcureFlow
            department_name="Ministry of Housing and Urban Affairs",
            challenge_title="Smart Waste Management",
            achieved_results="Successfully demonstrated 30% route optimization across 2 municipal zones.",
            validation_status="VALIDATED"
        )
        session.add(record1)
        
        session.commit()
        print("Extended dummy data seeded successfully.")

if __name__ == "__main__":
    seed_more_data()
