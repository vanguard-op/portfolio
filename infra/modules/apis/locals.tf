locals {
  source_path      = abspath("${path.module}/../../src/functions/backend")
  docker_file_path = "Dockerfile"
  path_include     = ["requirements.txt", "src/**"]
  files_include    = sort(setunion([for f in local.path_include : fileset(local.source_path, f)]...))
  dir_sha          = sha1(join("", [for f in local.files_include : filesha1("${local.source_path}/${f}")]))
}
