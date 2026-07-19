import sqlite3
from datetime import datetime
from news_sources import CATEGORY_SOURCES


class Database:
    def __init__(self, db_path):
        self.conn = sqlite3.connect(database=db_path, check_same_thread=False)

    def init_db(self):
        cursor = self.conn.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS articles(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                link TEXT,
                summary TEXT,
                source TEXT,
                fetched_at TEXT,
                published TEXT
            )
            """
        )
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS currency(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pairs TEXT,
                rate REAL,
                fetched_at TEXT
            )
            """
        )
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS metals(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                metalname TEXT,
                price1Tola INTEGER,
                price1g INTEGER,
                fetched_at TEXT
            )
            """
        )
        self.conn.commit()

    def save_article(self, article_dict):
        cursor = self.conn.cursor()
        fetched_at = datetime.now().isoformat()
        cursor.execute(
            '''INSERT INTO articles(title, link, summary, source, fetched_at, published)
            VALUES (?, ?, ?, ?, ?, ?)''', (article_dict["title"], article_dict["link"], article_dict["summary"], article_dict["source"], fetched_at, article_dict["published"])
        )
        self.conn.commit()

    def save_currency(self, currency_list):
        cursor = self.conn.cursor()
        fetched_at = datetime.now().isoformat()
        cursor.execute('''DELETE FROM currency''')
        for currency in currency_list:
            cursor.execute(
                '''INSERT INTO currency(pairs, rate, fetched_at) VALUES (?, ?, ?)''', (
                    currency["pairs"], currency["rate"], fetched_at)
            )
        self.conn.commit()

    def save_metals(self, gold_dict, silver_dict):
        cursor = self.conn.cursor()
        fetched_at = datetime.now().isoformat()
        cursor.execute(
            '''INSERT INTO metals(metalname, price1Tola, price1g, fetched_at) VALUES (?, ?, ?, ?)''', (
                "Gold", gold_dict["price1Tola"], gold_dict["price1g"], fetched_at)
        )
        cursor.execute(
            '''INSERT INTO metals(metalname, price1Tola, price1g, fetched_at) VALUES (?, ?, ?, ?)''', (
                "Silver", silver_dict["price1Tola"], silver_dict["price1g"], fetched_at)
        )
        self.conn.commit()

    def get_latest_news(self):
        return self.get_news_by_category("latest")

    def get_news_by_category(self, category="latest"):
        if category not in CATEGORY_SOURCES:
            return None
        source = CATEGORY_SOURCES[category]
        cursor = self.conn.cursor()
        cursor.execute(
            '''SELECT * FROM articles WHERE source = ? ORDER BY id DESC LIMIT 10''',
            (source,),
        )
        rows = cursor.fetchall()
        result = []
        for row in rows:
            article = {"id": row[0], "title": row[1],
                       "link": row[2], "summary": row[3], "source": row[4], "fetched_at": row[5], "published": row[6]}
            result.append(article)
        return result

    def get_article_by_id(self, article_id):
        cursor = self.conn.cursor()
        cursor.execute(
            '''SELECT * FROM articles WHERE id = ?''', (article_id,))
        row = cursor.fetchone()
        if not row:
            return None
        return {"id": row[0], "title": row[1], "link": row[2], "summary": row[3],
                "source": row[4], "fetched_at": row[5], "published": row[6]}

    def get_latest_rates(self):
        cursor = self.conn.cursor()
        rates = cursor.execute('''SELECT * FROM currency''')
        rows = rates.fetchall()
        result = []
        for row in rows:
            currency = {"id": row[0], "pairs": row[1],
                        "rate": row[2], "fetched_at": row[3]}
            result.append(currency)
        return result

    def get_metal_rates(self):
        cursor = self.conn.cursor()
        rates = cursor.execute('''
                       SELECT metalname, price1Tola, price1g, MAX(id), fetched_at
                       FROM metals
                       GROUP BY metalname
                       ''')
        rows = rates.fetchall()
        result = []
        for row in rows:
            rate = {"metalname": row[0], "price1Tola": row[1],
                    "price1g": row[2], "id": row[3], "fetched_at": row[4]}
            result.append(rate)
        return result
