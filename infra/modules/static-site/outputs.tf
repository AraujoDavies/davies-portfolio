output "site_bucket_name" {
  description = "Name of the S3 bucket that stores site objects"
  value       = aws_s3_bucket.site.id
}

output "site_bucket_arn" {
  description = "ARN of the S3 site bucket"
  value       = aws_s3_bucket.site.arn
}

output "logs_bucket_name" {
  description = "Name of the S3 bucket that stores access logs"
  value       = aws_s3_bucket.logs.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.site.domain_name
}

output "website_url" {
  description = "HTTPS URL of the published site"
  value       = "https://${var.domain_name}"
}

output "acm_certificate_arn" {
  description = "ARN of the ACM certificate used by CloudFront"
  value       = aws_acm_certificate.site.arn
}
