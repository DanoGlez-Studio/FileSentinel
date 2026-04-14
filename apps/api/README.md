# FileSentinel API

FastAPI service for file analysis in FileSentinel, powered by Magika.

## Local development

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e .[dev]
python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Environment variables

- `ALLOWED_API_KEYS`: Comma-separated API keys
- `MAX_FILE_SIZE_MB`: Max upload size in MB (default: 25)
- `JWT_ISSUER`: Issuer used to validate bearer tokens
- `JWT_AUDIENCE`: Audience used to validate bearer tokens
- `JWT_ALGORITHMS`: Allowed JWT algorithms
