# static-site

Private S3 origin + CloudFront (OAC) + ACM + Route 53 alias for a static website.

## Usage

```hcl
module "static_site" {
  source = "./modules/static-site"

  environment    = "prod"
  domain_name    = "davies.ataqtech.com.br"
  hosted_zone_id = data.aws_route53_zone.root.zone_id
  common_tags = {
    Environment = "prod"
    Project     = "portfolio-davies"
    Owner       = "ataqtech"
    ManagedBy   = "terraform"
  }
}
```

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `environment` | `string` | `dev`, `staging`, or `prod` |
| `domain_name` | `string` | FQDN served by CloudFront |
| `hosted_zone_id` | `string` | Route 53 zone for ACM DNS validation and alias records |
| `common_tags` | `map(string)` | Mandatory tags |

## Outputs

| Name | Description |
| --- | --- |
| `site_bucket_name` | Site content bucket |
| `site_bucket_arn` | Site bucket ARN |
| `logs_bucket_name` | Access logs bucket |
| `cloudfront_distribution_id` | Distribution ID (for invalidations) |
| `cloudfront_domain_name` | `*.cloudfront.net` hostname |
| `website_url` | `https://<domain_name>` |
| `acm_certificate_arn` | ACM certificate ARN |

## Security notes

- Site bucket has all public access blocks enabled; reads only via CloudFront OAC.
- Logs bucket allows ACLs solely for AWS log delivery (`log-delivery-write`); public bucket policies remain blocked.
- TLS in transit via CloudFront (`redirect-to-https`, TLS 1.2+).
- SSE-S3 at rest on both buckets.
