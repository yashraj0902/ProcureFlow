from fastapi import APIRouter
from app.api.endpoints import auth, dashboard, startups, challenges, pilots, kpis, applications

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(startups.router, prefix="/startups", tags=["startups"])
api_router.include_router(challenges.router, prefix="/challenges", tags=["challenges"])
api_router.include_router(pilots.router, prefix="/pilots", tags=["pilots"])
api_router.include_router(kpis.router, prefix="/kpis", tags=["kpis"])
api_router.include_router(applications.router, prefix="/applications", tags=["applications"])
