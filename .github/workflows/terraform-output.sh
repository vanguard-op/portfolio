#!/bin/bash
echo "Terraform init"
terraform init
echo "Terraform output"
user_interface_bucket=$(terraform output -raw user_interface_bucket)
user_interface_distribution_domain_name=$(terraform output -raw user_interface_distribution_domain_name)
echo "user_interface_bucket=$user_interface_bucket" >> $GITHUB_OUTPUT
echo "user_interface_distribution_domain_name=$user_interface_distribution_domain_name" >> $GITHUB_OUTPUT
echo "user_interface_bucket=$user_interface_bucket"
echo "user_interface_distribution_domain_name=$user_interface_distribution_domain_name"