# config.py
from database.database import Database
import os

db_path = os.getenv("DB_PATH", "news.db")
db = Database(db_path)
db.init_db()
