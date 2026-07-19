# main.py
from fastapi import FastAPI
from routers import news, metals, currency, refresh
from scheduler import scheduler
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "https://news-rates-dashboard.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(news.router)
app.include_router(metals.router)
app.include_router(currency.router)
app.include_router(refresh.router)
