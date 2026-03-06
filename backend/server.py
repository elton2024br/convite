from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class RSVPCreate(BaseModel):
    name: str
    phone: str
    email: str = ""
    guests: int = 1

class RSVPResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str = ""
    guests: int = 1
    confirmed_at: str = ""

class EventInfo(BaseModel):
    title: str = "Pre-lancamento - Complexo Imobiliario e Turistico Monte Verde"
    date: str = "21/03"
    time: str = "15:00"
    location: str = "Fazenda da Mata - Monte Verde - Camanducaia/MG"
    whatsapp: str = "5535991232422"
    maps_url: str = "https://www.google.com/maps/place/22%C2%B052'06.1%22S+46%C2%B007'48.2%22W/@-22.8683567,-46.1326256,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-22.8683567!4d-46.1300507?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D"


@api_router.get("/")
async def root():
    return {"message": "Monte Verde Invitation API"}

@api_router.get("/event", response_model=EventInfo)
async def get_event_info():
    return EventInfo()

@api_router.post("/rsvp", response_model=RSVPResponse)
async def create_rsvp(rsvp: RSVPCreate):
    rsvp_obj = RSVPResponse(
        name=rsvp.name,
        phone=rsvp.phone,
        email=rsvp.email,
        guests=rsvp.guests,
        confirmed_at=datetime.now(timezone.utc).isoformat()
    )
    doc = rsvp_obj.model_dump()
    await db.rsvps.insert_one(doc)
    return rsvp_obj

@api_router.get("/rsvps", response_model=List[RSVPResponse])
async def get_rsvps():
    rsvps = await db.rsvps.find({}, {"_id": 0}).to_list(1000)
    return rsvps


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
