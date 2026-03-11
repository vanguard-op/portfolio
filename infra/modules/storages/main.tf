# ===================================
# S3 Buckets
# ===================================
module "media_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket_prefix = "portfolio-media-"
  force_destroy = true
  cors_rule = [
    {
      allowed_headers = ["*"]
      allowed_methods = ["GET", "PUT", "POST", "DELETE", "HEAD"]
      allowed_origins = ["*"]
      expose_headers  = ["ETag"]
      max_age_seconds = 3000
    }
  ]

  tags = {
    Terraform   = "true"
    Environment = "prod"
  }
}
