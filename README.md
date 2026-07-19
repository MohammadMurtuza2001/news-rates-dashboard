# News & Rates Dashboard

A full-stack dashboard that aggregates news from multiple sources, generates AI-powered article summaries, and tracks live currency and precious metal (gold/silver) rates.

**Live demo:** https://news-rates-dashboard.vercel.app  
**Backend API:** https://news-rates-dashboard-production.up.railway.app/docs

## Features
- **News aggregation** — pulls and stores the latest articles from multiple RSS feeds
- **Currency rates** — live PKR exchange rates against 12+ currencies
- **Gold & silver prices** — real-time metal rates in PKR (per tola and per gram)
- **AI summaries** — on-demand article summarization via the Gemini API
- **Auto-refresh** — a background scheduler refreshes all data every 24 hours, plus a manual refresh endpoint
- **Persistent storage** — SQLite on a persistent volume, surviving redeploys and restarts

## Tech Stack
**Backend**
- Python, FastAPI, Uvicorn
- SQLite (via a custom `Database` class wrapping raw SQL)
- APScheduler for background jobs
- `feedparser` for RSS parsing
- Google Gemini API for summarization

**Frontend**
- React (Vite)
- Fetch-based API client with environment-based configuration

**Deployment**
- Backend: Railway (with a persistent volume for the database)
- Frontend: Vercel

## Architecture

```text
frontend/           React app (Vite) — deployed on Vercel
routers/            FastAPI route handlers (thin — delegate to services)
services/           Business logic — fetching, summarizing, orchestration
database/           Database class — all SQL lives here
config.py           Shared instances (Database, etc.), created once
scheduler.py        Background job setup (APScheduler)
news_sources.py     Single source of truth for RSS feeds (slug, label, url, source)
main.py             App entry point — assembles routers, middleware, scheduler
```

The project follows a **router/service/database separation**: routers only handle HTTP concerns, services contain reusable business logic (callable by both API routes and the scheduler), and all database access is encapsulated behind a single `Database` class. This meant the SQLite → cloud deployment migration (persistent volume, environment-based path config) required no changes outside `database.py` and `config.py`.

## Endpoints

| Method | Endpoint     | Description                                  |
|--------|--------------|----------------------------------------------|
| GET    | `/news`      | Latest stored articles                       |
| GET    | `/currency`  | Latest exchange rates (PKR vs. major currencies) |
| GET    | `/metals`    | Latest gold & silver prices                  |
| POST   | `/refresh`   | Manually re-fetch and store all data         |

Interactive API docs available at `/docs`.

## Design Decisions
- **SQLite over Postgres (for now):** chosen to ship a complete, working project first. The database layer is fully encapsulated in one class, making a future Postgres migration a contained change rather than a rewrite.
- **Snapshot vs. history storage:** currency rates store only the latest snapshot (old rows cleared on each refresh); gold/silver prices retain full history, aggregated to "latest per metal" via `GROUP BY`.
- **Scheduler runs in-process (APScheduler)** rather than an OS-level cron job, so it can call the same service functions directly — no HTTP round-trip, no duplicated logic between the API and the background job.
- **Summarization is on-demand, not automatic** — keeps Gemini API usage within free-tier limits by only summarizing articles a user actually requests.

## Known Limitations / Future Improvements
- Duplicate articles can occur if the scheduler runs twice on the same data (no uniqueness constraint on `link` yet)
- Currently single-database (SQLite); Postgres migration planned as a v2 improvement for better concurrent-write handling

## Local Setup

**Backend**
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# add a .env file with GEMINI_API_KEY=your_key_here
uvicorn main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
# add a .env file with VITE_API_URL=http://127.0.0.1:8000
npm run dev
```
