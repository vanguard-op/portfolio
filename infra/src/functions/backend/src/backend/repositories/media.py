from backend.utilities import s3
from backend.database.models.media import MediaCreateModel, MediaModel, MediaUploadModel
from aws_lambda_powertools.logging import Logger

logger = Logger()


class MediaRepository:
    def __init__(self):
        pass

    def create_media_upload_url(self, model: MediaCreateModel) -> MediaUploadModel:
        """Create media upload url from s3"""
        url, key = s3.create_media_upload_url(
            model.directory.value, model.filename, model.content_type
        )
        return MediaUploadModel(url=url, key=key)

    def list_media_object(
        self, directory: str, page_index=0, page_size=10
    ) -> list[MediaModel]:
        """List media object from s3"""
        return [
            MediaModel(key=key)
            for key in s3.list_media_object(directory, page_index, page_size)
        ]

    def get_media_url(self, key: str) -> str:
        """Get media url from s3"""
        url = s3.get_media_url(key)
        logger.info(f"media key: {key}")
        logger.info(f"media url: {url}")
        return url
