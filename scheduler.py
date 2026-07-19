# scheduler.py
from apscheduler.schedulers.background import BackgroundScheduler
from services.service_refresh import run_full_refresh
from datetime import datetime

scheduler = BackgroundScheduler()
scheduler.add_job(run_full_refresh, "interval",
                  hours=24, next_run_time=datetime.now())
scheduler.start()
