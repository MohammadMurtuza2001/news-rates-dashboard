# currency.py
from fastapi import APIRouter
from config import db
router = APIRouter()


@router.get("/currency")
def get_currency():
    result = db.get_latest_rates()
    return result
