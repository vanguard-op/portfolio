# ===================================
# S3 Buckets
# ===================================
module "media_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket_prefix = "portfolio-media-"
  force_destroy = true


  tags = {
    Terraform   = "true"
    Environment = "prod"
  }
}
