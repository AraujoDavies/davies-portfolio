variable "aws_region" {
  description = "AWS region for all resources (must be us-east-1 for CloudFront ACM)"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment (dev, staging, prod)"
  type        = string

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment must be dev, staging, or prod"
  }
}

variable "domain_name" {
  description = "Fully qualified domain name for the site (e.g. davies.ataqtech.com.br)"
  type        = string
}

variable "hosted_zone_name" {
  description = "Route 53 public hosted zone name that owns the subdomain"
  type        = string
}

variable "common_tags" {
  description = "Tags applied to every resource"
  type        = map(string)
  default = {
    Environment = "dev"
    Project     = "portfolio-davies"
    Owner       = "ataqtech"
    ManagedBy   = "terraform"
  }
}
