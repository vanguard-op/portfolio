from fastapi import APIRouter
from internal.repositories.projects import ProjectsRepository
from internal.database.models.models import ProjectModel

router = APIRouter(tags=["projects"])

repository = ProjectsRepository()


@router.get("/")
def get_all() -> list[ProjectModel]:
    return repository.get_all()


@router.get("/{id}")
def get_by_id(id: str) -> ProjectModel:
    return repository.get_by_id(id)


@router.post("/")
def create(project: ProjectModel) -> ProjectModel:
    return repository.create(project)


@router.put("/{id}")
def update(id: str, project: ProjectModel) -> ProjectModel:
    return repository.update(id)


@router.delete("/{id}")
def delete(id: str):
    return repository.delete(id)
