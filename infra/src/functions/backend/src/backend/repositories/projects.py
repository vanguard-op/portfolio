from backend.database.models.models import ProjectModel, ProjectCreateModel
import boto3
import os


class ProjectsRepository:
    def __init__(self):
        self.s3_client = boto3.client("s3")
        self.project_table = boto3.resource("dynamodb").Table(
            os.getenv("PROJECTS_TABLE", "")
        )

    def get_all(self) -> list[ProjectModel]:
        response = self.project_table.scan()
        return [ProjectModel(**item) for item in response.get("Items", [])]  # type: ignore

    def get_by_id(self, id: str) -> ProjectModel | None:
        response = self.project_table.get_item(Key={"id": id})
        item = response.get("Item")
        if not item:
            return None
        return ProjectModel(**item)  # type: ignore

    def create(self, project: ProjectCreateModel) -> ProjectModel:
        data = project.model_dump()
        self.project_table.put_item(Item=data)
        return ProjectModel(**data)

    def update(self, project: ProjectModel) -> ProjectModel:
        data = project.model_dump()
        self.project_table.put_item(Item=data)
        return ProjectModel(**data)

    def delete(self, id: str):
        self.project_table.delete_item(Key={"id": id})
        return True
