import os
import sys
from sqlalchemy import create_engine
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.models.domain import Base
from app.core.config import settings

def create():
    engine = create_engine(settings.DATABASE_URL)
    Base.metadata.create_all(bind=engine)
    print("Tables created.")

if __name__ == "__main__":
    create()
