locals {
  source_path      = abspath("${path.module}/../../src/functions")
  docker_file_path = "backend/Dockerfile"
  path_include     = ["backend/**"]
  files_include    = sort(setunion([for f in local.path_include : fileset(local.source_path, f)]...))
  dir_sha          = sha1(join("", [for f in local.files_include : filesha1("${local.source_path}/${f}")]))
}
