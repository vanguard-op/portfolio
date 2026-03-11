from backend.repositories.media import MediaRepository
from backend.database.models.media import MediaCreateModel, MediaDirectoriesEnum
import requests
from dotenv import load_dotenv
from pathlib import Path


if not load_dotenv(
    Path(__file__).parent.parent.parent.joinpath(".env.local"), override=True
):
    raise Exception("Unable to load environment file.")

repository = MediaRepository()

# print(repository.create_media_upload_url(MediaCreateModel(directory="projects", filename="test.txt")))
url = repository.create_media_upload_url(
    MediaCreateModel(directory=MediaDirectoriesEnum.PROJECTS, filename="portfolio.md")
)

# PUT to url
res = requests.put(
    url, data=open(Path(__file__).parent.joinpath("assets/portfolio.md"), "rb").read()
)
print(res.status_code, res.text)
