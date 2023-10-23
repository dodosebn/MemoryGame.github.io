from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserCreate(BaseModel):
    """Describes the request model for creating a new user profile."""
    username: str
    email: EmailStr  # This enforces email format validation
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None

    class Config:
        orm_mode = True


class DisplayUser(BaseModel):
    """Describes the response model for adding/fetching a user profile."""
    id:str
    first_name: Optional[str]
    last_name: Optional[str]
    username: str
    email: EmailStr
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class Login(BaseModel):
    """Describes the request model for user login."""

    email: EmailStr
    password: str

    class Config:
        orm_mode = True


class Token(BaseModel):
    """Describes the response model getting an access token."""

    access_token: str
    token_type: str

    class Config:
        orm_mode = True


class TokenData(BaseModel):
    """Describes the type of token data required to authenticate a user"""

    email: Optional[EmailStr]

    class Config:
        orm_mode = True
