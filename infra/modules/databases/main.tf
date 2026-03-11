# ===================================
# DynamoDB Tables
# ===================================
module "tables" {
  source = "terraform-aws-modules/dynamodb-table/aws"

  for_each = toset(["projects", "services", "reviews", "articles", "messages"])

  name     = each.value
  hash_key = "id"

  attributes = [
    {
      name = "id"
      type = "S"
    }
  ]

  tags = {
    Terraform   = "true"
    Environment = "prod"
  }
}
