from fastapi import APIRouter
from fastapi.exceptions import RequestValidationError
from backend.repositories.reviews import ReviewsRepository
from backend.database.models.models import ReviewModel, ReviewCreateModel

router = APIRouter(tags=["reviews"])

repository = ReviewsRepository()


@router.get("/")
def get_all() -> list[ReviewModel]:
    return repository.get_all()


@router.get("/{id}")
def get_by_id(id: str) -> ReviewModel | None:
    return repository.get_by_id(id)


@router.post("/")
def create(review: ReviewCreateModel) -> ReviewModel:
    return repository.create(review)


@router.put("/{id}")
def update(id: str, review: ReviewModel) -> ReviewModel:
    if id != review.id:
        raise RequestValidationError(["Unmatched review id"])
    return repository.update(review)


@router.delete("/{id}")
def delete(id: str):
    return repository.delete(id)
