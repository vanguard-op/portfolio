output "tables_arn" {
  value = [
    for table in module.tables : table.dynamodb_table_arn
  ]
}

output "env_vars" {
  value = {
    for table in module.tables : "${upper(table.dynamodb_table_id)}_TABLE" => table.dynamodb_table_id
  }
}
