terraform {
  backend "s3" {
    bucket       = "vanguard-op-terraform-state"
    key          = "portfolio-prod/terraform.tfstate"
    use_lockfile = true
  }
}
