data "aws_route53_zone" "root" {
  name         = var.hosted_zone_name
  private_zone = false
}

module "static_site" {
  source = "./modules/static-site"

  environment    = var.environment
  domain_name    = var.domain_name
  hosted_zone_id = data.aws_route53_zone.root.zone_id
  common_tags    = var.common_tags
}
