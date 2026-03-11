from internal.repositories.media import MediaRepository
from internal.database.models.media import MediaCreateModel
import requests
from dotenv import load_dotenv
from pathlib import Path


if not load_dotenv(Path(__file__).parent.parent.joinpath(".env.local"), override=True):
    raise "Unable to load environment file."

repository = MediaRepository()

# print(repository.create_media_upload_url(MediaCreateModel(directory="projects", filename="test.txt")))
url = repository.create_media_upload_url(
    MediaCreateModel(directory="images", filename="ahmad.jpg")
)

# PUT to url
res = requests.put(
    url, data=open(Path(__file__).parent.joinpath("assets/ahmad.jpg"), "rb").read()
)
print(res.status_code, res.text)
