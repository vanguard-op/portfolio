output "env_vars" {
  value = {
    "MEDIA_BUCKET" = module.media_bucket.s3_bucket_id
  }
}

output "buckets_arn" {
  value = [
    module.media_bucket.s3_bucket_arn,
    "${module.media_bucket.s3_bucket_arn}/*"
  ]
}
