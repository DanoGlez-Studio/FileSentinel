from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "FileSentinel API"
    app_version: str = "0.1.0"
    environment: str = "development"
    api_v1_prefix: str = "/api/v1"
    max_file_size_mb: int = 25
    allowed_api_keys: str = ""

    # Optional JWT config. If issuer/audience are empty, JWT auth is disabled.
    jwt_issuer: str = ""
    jwt_audience: str = ""
    jwt_algorithms: str = "RS256"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def api_keys(self) -> set[str]:
        return {value.strip() for value in self.allowed_api_keys.split(",") if value.strip()}

    @property
    def jwt_algorithm_list(self) -> list[str]:
        return [value.strip() for value in self.jwt_algorithms.split(",") if value.strip()]


settings = Settings()
