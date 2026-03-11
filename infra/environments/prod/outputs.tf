output "user_interface_bucket" {
  description = "bucket name of the user interface bucket"
  value       = module.user_interface.bucket
}

output "user_interface_distribution_domain_name" {
  description = "domain name of the user interface distribution"
  value       = module.user_interface.distribution_domain_name
}

output "api_domain_name" {
  description = "domain name of the API Gateway"
  value       = module.apis.api_domain_name
}

output "bucket_env_vars" {
  description = "environment variables of the S3 buckets"
  value       = module.storages.env_vars
}

output "database_env_vars" {
  description = "environment variables of the DynamoDB tables"
  value       = module.databases.env_vars
}
