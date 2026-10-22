output "site_bucket_name" {
  description = "Name of the S3 bucket that stores site objects"
  value       = module.static_site.site_bucket_name
}

output "site_bucket_arn" {
  description = "ARN of the S3 site bucket"
  value       = module.static_site.site_bucket_arn
}

output "logs_bucket_name" {
  description = "Name of the S3 bucket that stores access logs"
  value       = module.static_site.logs_bucket_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = module.static_site.cloudfront_distribution_id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = module.static_site.cloudfront_domain_name
}

output "website_url" {
  description = "HTTPS URL of the published site"
  value       = module.static_site.website_url
}

output "acm_certificate_arn" {
  description = "ARN of the ACM certificate used by CloudFront"
  value       = module.static_site.acm_certificate_arn
}
