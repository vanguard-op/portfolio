from backend.database.models.models import ArticleModel, ArticleCreateModel
import boto3
import os


class ArticlesRepository:
    def __init__(self):
        self.s3_client = boto3.client("s3")
        self.article_table = boto3.resource("dynamodb").Table(
            os.getenv("ARTICLES_TABLE", "")
        )

    def get_all(self) -> list[ArticleModel]:
        response = self.article_table.scan()
        return [ArticleModel(**item) for item in response.get("Items", [])]  # type: ignore

    def get_by_id(self, id: str) -> ArticleModel | None:
        response = self.article_table.get_item(Key={"id": id})
        item = response.get("Item")
        if not item:
            return None
        return ArticleModel(**item)  # type: ignore

    def create(self, article: ArticleCreateModel) -> ArticleModel:
        data = article.model_dump()
        self.article_table.put_item(Item=data)
        return ArticleModel(**data)

    def update(self, article: ArticleModel) -> ArticleModel:
        data = article.model_dump()
        print(data)
        self.article_table.put_item(Item=data)
        return ArticleModel(**data)

    def delete(self, id: str):
        self.article_table.delete_item(Key={"id": id})
        return True
