provider "aws" {}

module "storages" {
  source = "../../modules/storages"
}

module "databases" {
  source = "../../modules/databases"
}

module "apis" {
  source            = "../../modules/apis"
  tables_arn        = module.databases.tables_arn
  database_env_vars = module.databases.env_vars
  storage_env_vars  = module.storages.env_vars
  storages_arn      = module.storages.buckets_arn
}

# module "user_interface" {
#   source = "../../modules/user_interface"
#   # api_domain_name = module.apis.api_domain_name
# }
