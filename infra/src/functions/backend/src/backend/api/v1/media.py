from fastapi import APIRouter, Query
from fastapi.responses import RedirectResponse
from backend.repositories.media import MediaRepository
from backend.database.models.media import MediaCreateModel, MediaDirectoriesEnum

router = APIRouter(tags=["media"])

repository = MediaRepository()


@router.post("/upload-url", tags=["admin"])
def create_media_upload_url(media: MediaCreateModel) -> str:
    """Create media upload url from s3"""
    return repository.create_media_upload_url(media)


@router.get("/list")
def list_media_object(
    directory: MediaDirectoriesEnum = Query(
        ...,
        description="Directory to list media objects from",
    ),
    page_index: int = Query(0, description="Page index"),
) -> list[str]:
    """List media object from s3"""
    return repository.list_media_object(directory, page_index)


@router.get("/{key:path}")
def masked_media(key: str):
    new_url = repository.get_media_url(key)
    return RedirectResponse(new_url)
