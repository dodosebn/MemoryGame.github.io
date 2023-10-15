from datetime import datetime, timedelta
from jose import JWTError, jwt
from schema.user_schema import TokenData
from app_settings import settings
from db import models, db_setup
from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, status, Depends
from sqlalchemy.orm import Session


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login")
ALGORITHM = "HS256"

async def create_access_token(data: dict):
    """creates authentication token for a user.
    Args:
        data (dict): A key value pair of user infomation to be authenticated

    Returns:
        encoded_jwt: an encoded token used to provide user access
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def verify_token(token: str, credentials_exception):
    """validates access token
    Args:
        token (str): An OAuth2password bearer obtained from the login url.
        credentials_exception: exception details to be raised if user
             credentails is not valid
    Returns:
        token_data: an object containing user data
    Raises
        HTTP_401_UNAUTHORIZED: invalid credentials
        JWTError: invalid token
    """

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email)
    except JWTError:
        raise credentials_exception
    return token_data


async def get_current_user(token: str = Depends(oauth2_scheme),
                           db: Session = Depends(db_setup.get_db)):
    """fetches the details of the user that is being authenticated.

    fetches the user details from the database.
    verifies that the user has imputed the correct password,
    and then returns the user info.
    Args:
        token (str): An OAuth2password bearer obtained from the login url.
        db: the query database where the user info is stored

    Returns:
        user (dict): a key value pair of the user info (email address)
    Raises
        HTTP_401_UNAUTHORIZED: invalid credentials
    """

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = await verify_token(token, credentials_exception)
    user = db.query(models.User).filter(models.User.email == token_data.email)
    return user