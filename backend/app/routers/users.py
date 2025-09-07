
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import app.schemas as schemas
import app.crud as crud
from app.dependencies import get_db, get_current_active_user
from app.models import User

router = APIRouter()

@router.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@router.delete("/users/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_my_account(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    if not crud.delete_user_data(db, current_user.id):
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User and associated data deleted successfully"}
