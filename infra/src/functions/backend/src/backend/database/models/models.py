from pydantic import BaseModel, computed_field
from backend.utilities.s3 import get_media_url
from backend.utilities.parser import make_id
from datetime import datetime


class ImageModel(BaseModel):
    uri: str
    alt_text: str

    @computed_field
    @property
    def url(self) -> str:
        return get_media_url(self.uri)


class StackModel(BaseModel):
    name: str
    description: str


class ProjectCreateModel(BaseModel):
    image: ImageModel
    title: str
    overview: str
    content_uri: str
    stacks: list[StackModel]

    @computed_field
    @property
    def content_url(self) -> str:
        return get_media_url(self.content_uri)

    @computed_field
    @property
    def id(self) -> str:
        return make_id(self.title)

    @computed_field
    @property
    def created_at(self) -> str:
        return datetime.now().isoformat()

    @computed_field
    @property
    def updated_at(self) -> str:
        return datetime.now().isoformat()


class ProjectModel(BaseModel):
    id: str
    image: ImageModel
    title: str
    overview: str
    content_uri: str
    created_at: str
    updated_at: str
    stacks: list[StackModel]

    @computed_field
    @property
    def content_url(self) -> str:
        return get_media_url(self.content_uri)


class ServiceCreateModel(BaseModel):
    name: str
    description: str

    @computed_field
    @property
    def id(self) -> str:
        return make_id(self.name)

    @computed_field
    @property
    def created_at(self) -> str:
        return datetime.now().isoformat()

    @computed_field
    @property
    def updated_at(self) -> str:
        return datetime.now().isoformat()


class ServiceModel(BaseModel):
    id: str
    name: str
    description: str
    created_at: str
    updated_at: str


class ReviewCreateModel(BaseModel):
    client_name: str
    client_title: str
    message: str
    client_image: ImageModel
    company_image: ImageModel

    @computed_field
    @property
    def id(self) -> str:
        return make_id(f"{self.client_name} {self.client_title}")

    @computed_field
    @property
    def created_at(self) -> str:
        return datetime.now().isoformat()

    @computed_field
    @property
    def updated_at(self) -> str:
        return datetime.now().isoformat()


class ReviewModel(BaseModel):
    id: str
    client_name: str
    client_title: str
    message: str
    client_image: ImageModel
    company_image: ImageModel
    created_at: str
    updated_at: str


class ArticleModel(BaseModel):
    id: str
    title: str
    content_uri: str
    image: ImageModel
    created_at: str
    updated_at: str

    @computed_field
    @property
    def content_url(self) -> str:
        return get_media_url(self.content_uri)


class ArticleCreateModel(BaseModel):
    title: str
    content_uri: str
    image: ImageModel

    @computed_field
    @property
    def id(self) -> str:
        return make_id(self.title)

    @computed_field
    @property
    def created_at(self) -> str:
        return datetime.now().isoformat()

    @computed_field
    @property
    def updated_at(self) -> str:
        return datetime.now().isoformat()


class ContactMessageCreateModel(BaseModel):
    name: str
    email: str
    phone_no: str | None
    subject: str
    message: str

    @computed_field
    @property
    def id(self) -> str:
        return make_id(self.name)

    @computed_field
    @property
    def created_at(self) -> str:
        return datetime.now().isoformat()

    @computed_field
    @property
    def updated_at(self) -> str:
        return datetime.now().isoformat()


class ContactMessageModel(BaseModel):
    id: str
    name: str
    email: str
    phone_no: str | None
    subject: str
    message: str
    created_at: str
    updated_at: str
