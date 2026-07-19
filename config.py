# config.py
from database.database import Database

db = Database("news.db")
db.init_db()
