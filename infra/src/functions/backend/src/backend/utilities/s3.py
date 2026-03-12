import boto3
import os
from typing import TypedDict
from backend.utilities.parser import make_id

s3_client = boto3.client("s3")


class PresignParams(TypedDict, total=False):
    bucket: str
    key: str
    expires_in: int | None
    content_type: str | None


def get_s3_object_url(params: PresignParams) -> str:
    """Get s3 object url from s3"""
    bucket = params.get("bucket", os.getenv("MEDIA_BUCKET", ""))
    key = params.get("key", "")
    return s3_client.generate_presigned_url(
        "get_object",
        Params={"Bucket": bucket, "Key": key},
        ExpiresIn=params.get("expires_in") or 5 * 3600,
    )


def get_media_url(key: str) -> str:
    """Get media url from s3"""
    return get_s3_object_url({"key": key})


def create_s3_object_upload_url(params: PresignParams) -> str:
    """Create s3 object upload url from s3"""
    bucket: str = params.get("bucket") or os.getenv("MEDIA_BUCKET") or ""
    key: str = params.get("key") or ""

    upload_params: dict[str, str] = {
        "Bucket": bucket,
        "Key": key,
    }

    content_type = params.get("content_type")
    if content_type:
        upload_params["ContentType"] = content_type

    return s3_client.generate_presigned_url(
        "put_object",
        Params=upload_params,
        ExpiresIn=int(params.get("expires_in") or 3600),
    )


def create_media_upload_url(
    directory: str, filename: str, content_type: str | None = None
) -> tuple[str, str]:
    """Create media upload url from s3"""
    *name, ext = filename.split(".")
    filename = make_id("".join(name))
    key = f"{directory}/{filename}.{ext}"
    return create_s3_object_upload_url(
        {
            "key": key,
            "content_type": content_type,
        }
    ), key


def list_s3_object(bucket: str, key: str, page_index=0, page_size=10) -> list[str]:
    paginator = s3_client.get_paginator("list_objects_v2")
    pages = list(
        paginator.paginate(
            Bucket=bucket, Prefix=key, PaginationConfig={"PageSize": page_size}
        )
    )
    if page_index >= len(pages):
        return []

    current_page = pages[page_index]
    return [str(obj.get("Key", "")) for obj in current_page.get("Contents", [])]


def list_media_object(directory: str, page_index=0, page_size=10) -> list[str]:
    bucket = os.getenv("MEDIA_BUCKET", "")
    return list_s3_object(bucket, directory, page_index, page_size)
