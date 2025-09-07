import logging

logging.basicConfig(level=logging.INFO)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware # Added import
from app.routers import auth, users, roadmaps, dashboard, ai
import app.models as models
from app.database import engine
from app.core.config import CORS_ORIGINS
from app.core.limiter import limiter # Import the shared limiter instance

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Set default limits on the imported limiter instance
limiter.default_limits = ["100/minute"]

app.add_middleware(SlowAPIMiddleware)

@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "no-referrer-when-downgrade"
    response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';"
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/v1", tags=["Users"])
app.include_router(roadmaps.router, prefix="/api/v1", tags=["Roadmaps"])

app.include_router(dashboard.router, prefix="/api/v1", tags=["Dashboard"])
app.include_router(ai.router, prefix="/api/v1", tags=["AI"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Career Guidance API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}