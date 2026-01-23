data "archive_file" "this" {
  type        = "zip"
  source_dir  = var.source_dir
  output_path = "assets/${var.function_name}.zip"
}
