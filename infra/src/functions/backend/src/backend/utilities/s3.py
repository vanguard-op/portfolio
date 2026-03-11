import boto3
import os
from typing import TypedDict

s3_client = boto3.client("s3")


class PresignParams(TypedDict):
    bucket: str
    key: str
    expires_in: int | None


def get_s3_object_url(params: PresignParams) -> str:
    """Get s3 object url from s3"""
    return s3_client.generate_presigned_url(
        "get_object",
        Params={"Bucket": params["bucket"], "Key": params["key"]},
        ExpiresIn=params.get("expires_in") or 3600,
    )


def get_media_url(key: str) -> str:
    """Get media url from s3"""
    return get_s3_object_url({"bucket": os.getenv("MEDIA_BUCKET"), "key": key})


def create_s3_object_upload_url(params: PresignParams) -> str:
    """Create s3 object upload url from s3"""
    return s3_client.generate_presigned_url(
        "put_object",
        Params={"Bucket": params["bucket"], "Key": params["key"]},
        ExpiresIn=params.get("expires_in", 3600),
    )


def create_media_upload_url(directory: str, filename: str) -> str:
    """Create media upload url from s3"""
    return create_s3_object_upload_url(
        {"bucket": os.getenv("MEDIA_BUCKET"), "key": f"{directory}/{filename}"}
    )


def list_s3_object(bucket: str, key: str, page_index=0, page_size=10) -> list[str]:
    paginator = s3_client.get_paginator("list_objects_v2")
    pages = paginator.paginate(
        Bucket=bucket, Prefix=key, PaginationConfig={"PageSize": page_size}
    )
    pages = list(pages)
    if page_index >= len(pages):
        return []
    # for page in pages:
    #     for obj in page["Contents"]:
    #         yield obj["Key"]
    return [
        obj["Key"]
        for obj in pages[page_index].get("Contents", [])
        if "Contents" in pages[page_index].keys()
    ]


def list_media_object(directory: str, page_index=0, page_size=10) -> list[str]:
    return list_s3_object(os.getenv("MEDIA_BUCKET"), directory, page_index, page_size)
