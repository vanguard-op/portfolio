from internal.database.models.models import ProjectModel
import boto3
import os


class ProjectsRepository:
    def __init__(self):
        self.s3_client = boto3.client("s3")
        self.project_table = boto3.resource("dynamodb").Table(
            os.getenv("PROJECTS_TABLE")
        )

    def get_all(self) -> list[ProjectModel]:
        response = self.project_table.scan()
        return [ProjectModel(**item) for item in response["Items"]]

    def get_by_id(self, id: str) -> ProjectModel:
        response = self.project_table.get_item(Key={"id": id})
        return ProjectModel(**response["Item"])

    def create(self, project: ProjectModel) -> ProjectModel:
        response = self.project_table.put_item(Item=project.model_dump())
        return ProjectModel(**response["Item"])

    def update(self, project: ProjectModel) -> ProjectModel:
        response = self.project_table.update_item(
            Key={"id": project.id}, AttributeUpdates=project.model_dump()
        )
        return ProjectModel(**response["Item"])

    def delete(self, id: str) -> ProjectModel:
        response = self.project_table.delete_item(Key={"id": id})
        return ProjectModel(**response["Item"])
