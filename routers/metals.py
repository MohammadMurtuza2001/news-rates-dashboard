# metals.py
from fastapi import APIRouter
from config import db
router = APIRouter()


@router.get("/metals")
def get_metals():
    result = db.get_metal_rates()
    return result
