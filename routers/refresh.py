# refresh.py
from fastapi import APIRouter
from config import db
from services.service_refresh import run_full_refresh

router = APIRouter()


@router.post("/refresh")
def run_refresh():
    result = run_full_refresh()
    return result
