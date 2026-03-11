variable "database_env_vars" {
  type        = map(string)
  description = "Database environemnt variables"
}

variable "tables_arn" {
  type        = list(string)
  description = "List of all DynamoDB table ARNs"
}

variable "storage_env_vars" {
  type        = map(string)
  description = "Storage environemnt variables"
}

variable "storages_arn" {
  type        = list(string)
  description = "List of all Storage ARNs"
}
