from internal.utilities import s3
from internal.database.models.media import MediaCreateModel


class MediaRepository:
    def __init__(self):
        pass

    def create_media_upload_url(self, model: MediaCreateModel) -> str:
        """Create media upload url from s3"""
        return s3.create_media_upload_url(model.directory, model.filename)

    def list_media_object(self, directory: str, page_index=0) -> list[str]:
        """List media object from s3"""
        return s3.list_media_object(directory, page_index)

    def get_media_url(self, key: str) -> str:
        """Get media url from s3"""
        return s3.get_media_url(key)
