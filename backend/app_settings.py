import secrets
from pydantic_settings import BaseSettings

class Settings(BaseSettings):

    """Class to hold application config values"""

    app_name: str = "MemoryGame"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)

settings =Settings()