from backend.database.models.models import ReviewModel, ReviewCreateModel
import boto3
import os


class ReviewsRepository:
    def __init__(self):
        self.s3_client = boto3.client("s3")
        self.review_table = boto3.resource("dynamodb").Table(
            os.getenv("REVIEWS_TABLE", "")
        )

    def get_all(self) -> list[ReviewModel]:
        response = self.review_table.scan()
        return [ReviewModel(**item) for item in response.get("Items", [])]  # type: ignore

    def get_by_id(self, id: str) -> ReviewModel | None:
        response = self.review_table.get_item(Key={"id": id})
        item = response.get("Item")
        if not item:
            return None
        return ReviewModel(**item)  # type: ignore

    def create(self, review: ReviewCreateModel) -> ReviewModel:
        data = review.model_dump()
        self.review_table.put_item(Item=data)
        return ReviewModel(**data)

    def update(self, review: ReviewModel) -> ReviewModel:
        data = review.model_dump()
        self.review_table.put_item(Item=data)
        return ReviewModel(**data)

    def delete(self, id: str):
        self.review_table.delete_item(Key={"id": id})
        return True
