data "aws_iam_policy_document" "origin_bucket_policy" {
  statement {
    sid    = "AllowCloudFrontServicePrincipalReadWrite"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject",
      "s3:PutObject",
    ]

    resources = [
      "${aws_s3_bucket.portfolio.arn}/*",
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.portfolio.arn]
    }
  }
}

resource "aws_s3_bucket" "portfolio" {
  tags = {
    Name = "portfolio"
  }
}

resource "aws_s3_bucket_policy" "portfolio" {
  bucket = aws_s3_bucket.portfolio.bucket
  policy = data.aws_iam_policy_document.origin_bucket_policy.json
}

# locals {
#   s3_origin_id = "myS3Origin"
#   my_domain    = "mydomain.com"
# }

resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "default-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Define a CloudFront distribution for the S3 bucket
resource "aws_cloudfront_distribution" "portfolio" {
  origin {
    domain_name              = aws_s3_bucket.portfolio.bucket_regional_domain_name
    origin_id                = aws_s3_bucket.portfolio.id
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
  }
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.portfolio.id

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
