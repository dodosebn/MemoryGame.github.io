from fastapi import FastAPI
from sqlalchemy import engine
from routers import users
from db import models
from db.db_setup import engine
from app_settings import settings

app = FastAPI(
    title=settings.app_name, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

models.Base.metadata.create_all(engine)


@app.get("/")
def homepage():
    welcome_note = "Welcome to MemoryGame API version 1.\
        Kindly proceed to /docs to explore our easy to use API endpoints"
    return welcome_note


app.include_router(
    users.router, prefix=settings.API_V1_STR, tags= ["Users"]
    ) # include urls from users.py
