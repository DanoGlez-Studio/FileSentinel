from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.core.config import settings
from app.core.security import AuthContext, require_auth
from app.services.magika_service import magika_service

router = APIRouter(prefix="/analyze", tags=["analyze"])


@router.post("/file")
async def analyze_file(
    file: UploadFile = File(...),
    _: AuthContext = Depends(require_auth),
) -> dict:
    content = await file.read()

    max_size_bytes = settings.max_file_size_mb * 1024 * 1024
    if len(content) > max_size_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File too large. Maximum size is {settings.max_file_size_mb} MB.",
        )

    return magika_service.analyze_file(content, file.filename or "upload.bin")


@router.get("/content-types")
def content_types(_: AuthContext = Depends(require_auth)) -> dict[str, list[str]]:
    # Initial placeholder list. In future versions this can come from model metadata.
    return {
        "labels": [
            "pdf",
            "zip",
            "png",
            "jpeg",
            "python",
            "javascript",
            "json",
            "csv",
            "docx",
            "xlsx",
        ]
    }
