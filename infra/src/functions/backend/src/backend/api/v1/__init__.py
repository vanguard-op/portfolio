from fastapi import APIRouter
from . import articles, projects, reviews, services, media

router = APIRouter()
router.include_router(projects.router, prefix="/projects")
router.include_router(media.router, prefix="/media")
router.include_router(reviews.router, prefix="/reviews")
router.include_router(services.router, prefix="/services")
router.include_router(articles.router, prefix="/articles")
