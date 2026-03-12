from fastapi import APIRouter
from fastapi.exceptions import RequestValidationError
from backend.repositories.projects import ProjectsRepository
from backend.database.models.models import ProjectModel, ProjectCreateModel

router = APIRouter(tags=["projects"])

repository = ProjectsRepository()


@router.get("/")
def get_all() -> list[ProjectModel]:
    return repository.get_all()


@router.get("/{id}")
def get_by_id(id: str) -> ProjectModel | None:
    return repository.get_by_id(id)


@router.post("/")
def create(project: ProjectCreateModel) -> ProjectModel:
    return repository.create(project)


@router.put("/{id}")
def update(id: str, project: ProjectModel) -> ProjectModel:
    if id != project.id:
        raise RequestValidationError(["Unmatched project id"])
    return repository.update(project)


@router.delete("/{id}")
def delete(id: str):
    return repository.delete(id)
