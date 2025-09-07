from fastapi import APIRouter, Depends, HTTPException, status, Body, Request
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import timedelta
from jose import jwt
import logging

from fastapi_mail import FastMail, MessageSchema
from app.core.mail import conf

import app.schemas as schemas
import app.crud as crud
from app.dependencies import get_db, get_current_user_from_refresh_token, get_current_active_user, get_current_user
from app.core.limiter import limiter # Import the shared limiter instance
from app.core.security import (
    create_access_token, create_refresh_token, verify_password,
    create_email_verification_token, verify_email_verification_token,
    is_password_strong_enough
)
from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM

router = APIRouter(tags=["Authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

logger = logging.getLogger(__name__)

async def send_verification_email(email: str, token: str):
    verification_link = f"http://localhost:3000/verify-email/{token}"
    message = MessageSchema(
        subject="Verify your email address",
        recipients=[email],
        body=f"""
        <p>Click the link to verify your email: <a href="{verification_link}">{verification_link}</a></p>
        """,
        subtype="html"
    )

    fm = FastMail(conf)
    await fm.send_message(message)

@router.post("/register", response_model=schemas.TokenWithUser)
async def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user_by_email = crud.get_user_by_email(db, email=user.email)
    if db_user_by_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    if not is_password_strong_enough(user.password):
        raise HTTPException(status_code=400, detail="Password is not strong enough. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")

    new_user = crud.create_user(db=db, user=user)
    
    # Send verification email
    verification_token = create_email_verification_token(email=new_user.email)
    await send_verification_email(new_user.email, verification_token)
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": new_user.email}, expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(data={"sub": new_user.email})
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": new_user
    }

@router.post("/login", response_model=schemas.TokenWithUser)
@limiter.limit("5/10minute")
def login_for_access_token(request: Request, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        logger.warning(f"Failed login attempt for user: {form_data.username} from IP: {request.client.host}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(data={"sub": user.email})
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": user
    }

@router.post("/refresh", response_model=schemas.Token)
def refresh_access_token(current_user: schemas.User = Depends(get_current_user_from_refresh_token)):
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    new_access_token = create_access_token(
        data={"sub": current_user.email}, expires_delta=access_token_expires
    )
    return {
        "access_token": new_access_token,
        "refresh_token": "", # Refresh token is not returned here, client should re-use the existing one
        "token_type": "bearer"
    }

@router.post("/logout")
def logout(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        jti = payload.get("jti")
        if not jti:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token")
        crud.add_jti_to_blocklist(db, jti)
        return {"message": "Successfully logged out"}
    except jwt.JWTError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token")

@router.post("/request-verification-email")
@limiter.limit("1/minute")
async def request_verification_email(request: Request, current_user: schemas.User = Depends(get_current_user)):
    if current_user.is_email_verified:
        logger.info(f"User {current_user.email} requested verification email, but email is already verified.")
        raise HTTPException(status_code=400, detail="Email is already verified")
    
    logger.info(f"Verification email requested for user: {current_user.email} from IP: {request.client.host}")
    verification_token = create_email_verification_token(email=current_user.email)
    await send_verification_email(current_user.email, verification_token)
    logger.info(f"Verification email sent to user: {current_user.email}")
    return {"message": "Verification email sent"}

@router.get("/verify-email/{token}")
@limiter.limit("10/minute")
def verify_email(request: Request, token: str, db: Session = Depends(get_db)):
    email = verify_email_verification_token(token)
    if not email:
        logger.warning(f"Invalid or expired verification token received from IP: {request.client.host}")
        raise HTTPException(status_code=400, detail="Invalid or expired verification token")
    
    user = crud.get_user_by_email(db, email=email)
    if not user:
        logger.warning(f"User not found for email: {email} from verification token. IP: {request.client.host}")
        raise HTTPException(status_code=404, detail="User not found")
        
    if user.is_email_verified:
        logger.info(f"Email already verified for user: {user.email}. IP: {request.client.host}")
        return {"message": "Email is already verified"}
        
    crud.set_user_email_verified(db, user)
    logger.info(f"Email successfully verified for user: {user.email}. IP: {request.client.host}")
    return {"message": "Email successfully verified"}

@router.get("/me", response_model=schemas.User)
def read_users_me(current_user: schemas.User = Depends(get_current_active_user)):
    return current_user
