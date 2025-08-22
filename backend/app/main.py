from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, users, roadmaps, dashboard, ai
import app.models as models
from app.database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1", tags=["Authentication"])
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