from fastapi import APIRouter
from .projects import router as projects_router
from .media import router as media_router

router = APIRouter()
router.include_router(projects_router, prefix="/projects")
router.include_router(media_router, prefix="/media")
