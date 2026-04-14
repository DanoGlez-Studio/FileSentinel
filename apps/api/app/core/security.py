from typing import Optional

from fastapi import Depends, Header, HTTPException, status
from jose import JWTError, jwt

from app.core.config import settings


class AuthContext(dict):
    pass


def _validate_api_key(x_api_key: Optional[str]) -> Optional[AuthContext]:
    if not x_api_key:
        return None

    if x_api_key not in settings.api_keys:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API key")

    return AuthContext(kind="api_key")


def _validate_jwt_token(authorization: Optional[str]) -> Optional[AuthContext]:
    if not authorization:
        return None

    if not settings.jwt_issuer or not settings.jwt_audience:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="JWT auth not configured")

    if not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authorization header")

    token = authorization.split(" ", 1)[1].strip()

    try:
        payload = jwt.get_unverified_claims(token)
    except JWTError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid JWT token") from exc

    issuer = payload.get("iss")
    audience = payload.get("aud")

    if issuer != settings.jwt_issuer:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token issuer")

    if isinstance(audience, str):
        valid_audience = audience == settings.jwt_audience
    else:
        valid_audience = settings.jwt_audience in (audience or [])

    if not valid_audience:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token audience")

    return AuthContext(kind="jwt", subject=payload.get("sub"))


def require_auth(
    authorization: Optional[str] = Header(default=None),
    x_api_key: Optional[str] = Header(default=None),
) -> AuthContext:
    api_ctx = _validate_api_key(x_api_key)
    if api_ctx:
        return api_ctx

    jwt_ctx = _validate_jwt_token(authorization)
    if jwt_ctx:
        return jwt_ctx

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")


def auth_dependency() -> AuthContext:
    return Depends(require_auth)
