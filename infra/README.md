# Infra — portfolio Davies (S3 + CloudFront)

Terraform for `https://davies.ataqtech.com.br/`: private S3, CloudFront with OAC, ACM in `us-east-1`, and Route 53 alias on the existing `ataqtech.com.br` hosted zone.

## Layout

```
infra/
  envs/prod.tfvars
  modules/static-site/
  main.tf
  providers.tf
  variables.tf
  outputs.tf
  versions.tf
```

State is **local** (no remote backend in this cut).

## Prerequisites

- Terraform `>= 1.6`
- AWS credentials with rights for S3, CloudFront, ACM, Route 53, IAM policy documents
- Public hosted zone `ataqtech.com.br` already in Route 53 in the same account

## Deploy infrastructure

```bash
cd infra
terraform init
terraform plan -var-file="envs/prod.tfvars"
terraform apply -var-file="envs/prod.tfvars"
```

Useful outputs after apply:

- `site_bucket_name`
- `cloudfront_distribution_id`
- `website_url`

## Publish site content

### GitHub Actions (main)

Push em `main` (alterações em `front/**`) dispara [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml): build → `s3 sync` → invalidação CloudFront.

Configure no repositório GitHub:

| Tipo | Nome | Valor |
| --- | --- | --- |
| Secret | `AWS_ROLE_ARN` | ARN da role IAM assumida via OIDC |
| Variable | `AWS_S3_BUCKET` | output `site_bucket_name` |
| Variable | `CLOUDFRONT_DISTRIBUTION_ID` | output `cloudfront_distribution_id` |

A role precisa confiar no OIDC do GitHub com `sub` em `repo:AraujoDavies/davies-portfolio:ref:refs/heads/main` e permitir no mínimo:

- `s3:ListBucket` no bucket do site
- `s3:PutObject`, `s3:DeleteObject`, `s3:GetObject` nos objetos do bucket
- `cloudfront:CreateInvalidation` na distribution

### Manual

```bash
cd front
npm run build
aws s3 sync dist/ s3://$(terraform -chdir=../infra output -raw site_bucket_name)/ --delete
aws cloudfront create-invalidation \
  --distribution-id "$(terraform -chdir=../infra output -raw cloudfront_distribution_id)" \
  --paths "/*"
```


## Logs

| Source | Prefix in logs bucket |
| --- | --- |
| S3 server access logs | `s3/` |
| CloudFront standard access logs | `cloudfront/` |

AWS writes log objects asynchronously; they are not application logs.

## Destroy

```bash
cd infra
terraform destroy -var-file="envs/prod.tfvars"
```

Empty both buckets first if destroy fails on non-empty S3 buckets.

## Security checklist — static-site

- [x] Encryption at rest: SSE-S3 (AES256) on site and logs buckets
- [x] Encryption in transit: CloudFront HTTPS redirect, TLS 1.2_2021
- [x] No public exposure of S3 site objects (exception: CloudFront is the public entrypoint)
- [x] Least-privilege IAM: OAC + bucket policy scoped to the distribution ARN (`data.aws_iam_policy_document`)
- [x] Mandatory tags: via `common_tags` / provider `default_tags`
- [x] Secrets via SSM/Secrets Manager: N/A
