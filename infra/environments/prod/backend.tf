terraform {
  backend "s3" {
    bucket       = "vanguard-op-terraform-state"
    key          = "portfolio-dev/terraform.tfstate"
    use_lockfile = true
  }
}
