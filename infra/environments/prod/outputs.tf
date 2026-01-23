output "user_interface_bucket" {
  description = "bucket name of the user interface bucket"
  value       = module.user_interface.bucket
}

output "user_interface_distribution_domain_name" {
  description = "domain name of the user interface distribution"
  value       = module.user_interface.distribution_domain_name
}