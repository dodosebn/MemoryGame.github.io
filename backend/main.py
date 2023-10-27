from fastapi import FastAPI
from sqlalchemy import engine
from routers import users
from db import models
from db.db_setup import engine
from app_settings import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title=settings.app_name, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

models.Base.metadata.create_all(engine)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def homepage():
    welcome_note = "Welcome to MemoryGame API version 1.\
        Kindly proceed to /docs to explore our easy to use API endpoints"
    return welcome_note


app.include_router(
    users.router, prefix=settings.API_V1_STR, tags= ["Users"]
    ) # include urls from users.py
