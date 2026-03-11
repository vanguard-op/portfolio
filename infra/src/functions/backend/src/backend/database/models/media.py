from pydantic import BaseModel, computed_field
from enum import Enum
from backend.utilities.s3 import get_media_url


class MediaDirectoriesEnum(str, Enum):
    PROJECTS = "projects"
    ARTICLES = "articles"
    IMAGES = "images"


class MediaCreateModel(BaseModel):
    directory: MediaDirectoriesEnum
    filename: str


class MediaModel(BaseModel):
    key: str

    @computed_field
    @property
    def url(self) -> str:
        return get_media_url(self.key)
