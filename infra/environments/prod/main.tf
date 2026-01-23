provider "aws" {}

# module "apis" {
#   source = "../../modules/apis"
# }

# module "databases" {
#   source = "../../modules/databases"
# }

module "user_interface" {
  source = "../../modules/user_interface"
}
