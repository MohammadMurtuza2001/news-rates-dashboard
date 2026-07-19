from fastapi import APIRouter, HTTPException
from config import db
from news_sources import CATEGORY_SOURCES, NEWS_SOURCES
from services.service_gemini import summarize_prompt
import os

router = APIRouter()


@router.get("/news/categories")
def get_news_categories():
    return [{"slug": entry["slug"], "label": entry["label"]} for entry in NEWS_SOURCES]


@router.get("/news")
def get_news(category: str = "latest"):
    if category not in CATEGORY_SOURCES:
        raise HTTPException(
            status_code=422,
            detail=f"Invalid category. Allowed values: {', '.join(CATEGORY_SOURCES.keys())}",
        )
    return db.get_news_by_category(category)


@router.post("/news/{article_id}/summarize")
def summarize_news(article_id: int):
    if not os.getenv("GEMINI_API_KEY"):
        raise HTTPException(
            status_code=503, detail="Summarization service unavailable")

    article = db.get_article_by_id(article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    summary = summarize_prompt(article["title"], article["summary"])
    return {"summary": summary}
