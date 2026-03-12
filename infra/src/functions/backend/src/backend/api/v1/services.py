from fastapi import APIRouter
from fastapi.exceptions import RequestValidationError
from backend.repositories.services import ServicesRepository
from backend.database.models.models import ServiceModel, ServiceCreateModel

router = APIRouter(tags=["services"])

repository = ServicesRepository()


@router.get("/")
def get_all() -> list[ServiceModel]:
    return repository.get_all()


@router.get("/{id}")
def get_by_id(id: str) -> ServiceModel | None:
    return repository.get_by_id(id)


@router.post("/")
def create(service: ServiceCreateModel) -> ServiceModel:
    return repository.create(service)


@router.put("/{id}")
def update(id: str, service: ServiceModel) -> ServiceModel:
    if id != service.id:
        raise RequestValidationError(["Unmatched service id"])
    return repository.update(service)


@router.delete("/{id}")
def delete(id: str):
    return repository.delete(id)
