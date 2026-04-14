from __future__ import annotations

import time
import uuid
from io import BytesIO
from typing import Any

from magika import Magika


class MagikaService:
    def __init__(self) -> None:
        self._model = Magika()

    def analyze_file(self, file_bytes: bytes, filename: str) -> dict[str, Any]:
        start = time.perf_counter()
        result = self._model.identify_stream(BytesIO(file_bytes))
        elapsed_ms = round((time.perf_counter() - start) * 1000, 2)

        output = result.output

        score = float(getattr(result, "score", 0.0) or 0.0)
        if score >= 0.9:
            confidence = "high"
        elif score >= 0.6:
            confidence = "medium"
        else:
            confidence = "low"

        return {
            "request_id": str(uuid.uuid4()),
            "filename": filename,
            "size": len(file_bytes),
            "magika_label": output.label,
            "description": output.description,
            "mime_type": output.mime_type,
            "score": score,
            "confidence_level": confidence,
            "elapsed_ms": elapsed_ms,
            "warnings": [],
        }


magika_service = MagikaService()
