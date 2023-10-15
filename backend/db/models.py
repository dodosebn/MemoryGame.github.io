from db.db_setup import Base
from datetime import datetime
from sqlalchemy.schema import Column
from sqlalchemy.types import String, DateTime, Boolean, Text
from uuid import uuid4


class User(Base):
    """
    Describes the table structure of the user model in the database
    """
    __tablename__ = "users"

    id = Column(String(50), primary_key=True, index=True, default=uuid4().hex)
    first_name = Column(String(20), nullable=True)
    last_name = Column(String(20), nullable=True)
    username = Column(String(50), nullable=False, unique=True, index=True)
    email = Column(String, unique=True, nullable=False,
        info={'check_constraint': "email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'"})
    hashed_password = Column(Text, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow())
    updated_at = Column(DateTime, default=datetime.utcnow())
