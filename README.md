# FileSentinel Monorepo

Open-source monorepo for a simple and scalable file intelligence platform powered by Magika.

## Stack

- `apps/web`: Next.js + Tailwind CSS + next-intl + Auth.js
- `apps/api`: FastAPI + Magika
- Auth-ready for: Discord, Google, Microsoft
- API protection with: JWT and API keys

## Monorepo structure

```text
apps/
  web/
  api/
docs/
```

## Quick start

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
npm install
npm run dev:web
```

In another terminal:

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -e .[dev]
npm run dev
```

## API endpoints (v1)

- `GET /api/v1/health`
- `GET /api/v1/version`
- `POST /api/v1/analyze/file`
- `GET /api/v1/analyze/content-types`

## Multi-language

The web app currently supports:

- `es`
- `en`

## Authentication model

- Web users authenticate through OAuth providers in Auth.js
- Backend accepts:
  - `Authorization: Bearer <jwt>`
  - `x-api-key: <api-key>`

## Docker

```bash
docker compose up --build
```
