# Architecture

## Goals

- Simple OSS onboarding
- Scalable API-first design
- Multi-language UI
- Auth for human users and machine clients

## Components

- Web: Next.js, Tailwind, next-intl, Auth.js
- API: FastAPI (FileSentinel API), Magika
- Security: OAuth sessions + API keys

## Scaling path

1. Stateless API pods
2. Redis queue for async batch analysis
3. PostgreSQL for users, keys, quotas, and audit logs
4. S3 compatible storage for optional file retention
