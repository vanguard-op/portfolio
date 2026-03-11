from pydantic import BaseModel
from enum import Enum


class MediaDirectoriesEnum(str, Enum):
    PROJECTS = "projects"
    ARTICLES = "articles"
    IMAGES = "images"


class MediaCreateModel(BaseModel):
    directory: MediaDirectoriesEnum
    filename: str
