variable "function_name" {
  type        = string
  description = "The name of the function"
  default     = "rest_handler"
}

variable "source_dir" {
  type        = string
  description = "The source directory of the function"
  default     = "../../src/functions/rest_handler"
}
