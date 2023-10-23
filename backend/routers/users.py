from dependencies import auth, hashing
from fastapi import APIRouter, Depends, HTTPException, status
from schema import user_schema
from db import models
from sqlalchemy.orm import Session
from db.db_setup import get_db
from fastapi.security import OAuth2PasswordRequestForm
from uuid import uuid4

router = APIRouter()


@router.post("/users", status_code=status.HTTP_201_CREATED,
             response_model=user_schema.DisplayUser)
async def create_user(request: user_schema.UserCreate,
                      db: Session = Depends(get_db)):
    """creates a new user instance in the database.
    The user info received from the user_schema is
    stored to a new role in the user table
    Args:
        request (str): A pydantic model that provides the user info to be stored
        db (Session): The sqlite database for storing the article object
    Returns:
        HTTP_201_created: user profile successfully created
    """
    username = request.username.capitalize()
    email = request.email.lower()

    existing_email = db.query(models.User).filter(models.User.email == email).first()
    if existing_email:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="email already exist")

    existing_username = db.query(models.User).filter(models.User.username == username).first()
    if existing_username:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="username already exist")

    user = models.User(
            id=uuid4().hex,
            first_name=request.first_name,
            last_name=request.last_name,
            username=username,
            email=email,
            hashed_password=await hashing.hash_password(request.password)
        )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login", response_model=user_schema.Token)
async def login(request: OAuth2PasswordRequestForm = Depends(),
                db: Session = Depends(get_db)):
    """authenticates a user attempting to login.
    Args:
        request: an password request form that provides authentication details
        db (Session): The sqlite database for storing the article object
    Returns:
        HTTP_200_OK {dict}: key value pair of access token and token type
    Raises:
        HTTP_404_NOT_FOUND: invalid credentials
    """
    user = db.query(models.User).filter(
        models.User.username == request.username.capitalize()).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Invalid Credentials")
    verifier = await hashing.verify_password(request.password, user.hashed_password)
    if not verifier:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Invalid Credentials")
    access_token = await auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/{username}", response_model=user_schema.DisplayUser)
def get_user(username: str, db: Session = Depends(get_db)):
    """fetches the user details of a specified user {username}.
    Takes the username of a user.
    Queries the database with this info to fetch other details
    Args:
        username (str): a valid username of a registered user
        db (Session): The sqlite database for storing the article object
    Returns:
        HTTP_200_OK: query successful
    Raises:
        HTTP_404_NOT_FOUND: username not found in the db
    """
    user = db.query(models.User).filter(models.User.username == username.capitalize()).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")
    return user