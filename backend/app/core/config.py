from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "ProcureFlow API"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = "supersecretjwtkey_for_demo"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    DATABASE_URL: str = "postgresql://procureflow:procureflowpassword@db:5432/procureflow"
    
    class Config:
        case_sensitive = True

settings = Settings()
