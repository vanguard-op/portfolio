output "api_domain_name" {
  value       = module.api_gateway.stage_domain_name
  description = "The domain name of the API Gateway."
}
