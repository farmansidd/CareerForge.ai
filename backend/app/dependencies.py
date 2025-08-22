from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.core.config import SECRET_KEY, ALGORITHM
import app.crud as crud

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_active_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    print(f"[DEBUG] Token received: {token[:30]}...") # Log first 30 chars of token
    print(f"[DEBUG] SECRET_KEY used: {SECRET_KEY}")
    print(f"[DEBUG] ALGORITHM used: {ALGORITHM}")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(f"[DEBUG] Decoded payload: {payload}")
        email: str = payload.get("sub")
        print(f"[DEBUG] Email from payload: {email}")
        if email is None:
            print("[DEBUG] Email is None, raising credentials_exception")
            raise credentials_exception
    except JWTError as e:
        print(f"[DEBUG] JWTError during decoding: {e}")
        raise credentials_exception
    user = crud.get_user_by_email(db, email=email)
    print(f"[DEBUG] User ID: {user.id}")
    print(f"[DEBUG] User from DB: {user}")
    if user is None:
        print("[DEBUG] User is None, raising credentials_exception")
        raise credentials_exception
    return user