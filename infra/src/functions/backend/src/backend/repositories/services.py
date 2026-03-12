from backend.database.models.models import ServiceModel, ServiceCreateModel
import boto3
import os


class ServicesRepository:
    def __init__(self):
        self.s3_client = boto3.client("s3")
        self.service_table = boto3.resource("dynamodb").Table(
            os.getenv("SERVICES_TABLE", "")
        )

    def get_all(self) -> list[ServiceModel]:
        response = self.service_table.scan()
        return [ServiceModel(**item) for item in response.get("Items", [])]  # type: ignore

    def get_by_id(self, id: str) -> ServiceModel | None:
        response = self.service_table.get_item(Key={"id": id})
        item = response.get("Item")
        if not item:
            return None
        return ServiceModel(**item)  # type: ignore

    def create(self, service: ServiceCreateModel) -> ServiceModel:
        data = service.model_dump()
        self.service_table.put_item(Item=data)
        return ServiceModel(**data)

    def update(self, service: ServiceModel) -> ServiceModel:
        data = service.model_dump()
        self.service_table.put_item(Item=data)
        return ServiceModel(**data)

    def delete(self, id: str):
        self.service_table.delete_item(Key={"id": id})
        return True
