output "bucket" {
  description = "bucket name of the portfolio bucket"
  value       = aws_s3_bucket.portfolio.bucket
}

output "distribution_domain_name" {
  description = "domain name of the portfolio distribution"
  value       = aws_cloudfront_distribution.portfolio.domain_name
}