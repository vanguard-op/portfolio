from fastapi import APIRouter
from fastapi.exceptions import RequestValidationError
from backend.repositories.articles import ArticlesRepository
from backend.database.models.models import ArticleModel, ArticleCreateModel

router = APIRouter(tags=["articles"])

repository = ArticlesRepository()


@router.get("/")
def get_all() -> list[ArticleModel]:
    return repository.get_all()


@router.get("/{id}")
def get_by_id(id: str) -> ArticleModel | None:
    return repository.get_by_id(id)


@router.post("/")
def create(article: ArticleCreateModel) -> ArticleModel:
    return repository.create(article)


@router.put("/{id}")
def update(id: str, article: ArticleModel) -> ArticleModel:
    if id != article.id:
        raise RequestValidationError(["Unmatched article id"])
    return repository.update(article)


@router.delete("/{id}")
def delete(id: str):
    return repository.delete(id)
