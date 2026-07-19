# services/service_refresh.py
from services.service_news import feed_fetcher
from services.service_currency import get_currency_rates
from services.service_metals import get_gold_price, get_silver_price
from config import db
from news_sources import REFRESH_SOURCES


def run_full_refresh():
    # 1. Fetch from each RSS source, save each article
    count_of_articles = 0

    for url, name in REFRESH_SOURCES:
        articles = feed_fetcher(url, name)
        print(f"{name}: fetched {len(articles)} articles")
        count_of_articles += len(articles)
        for article in articles:
            db.save_article(article)

    # 2. Fetch currency rates, save them
    currency_list = get_currency_rates()
    db.save_currency(currency_list)

    # 3. Fetch gold + silver prices, save them
    gold = get_gold_price()
    silver = get_silver_price()
    db.save_metals(gold, silver)

    # 4. Return something meaningful (A summary with counts)
    summary = {
        "articles_fetched": count_of_articles,
        "currencies_fetched": len(currency_list),
        "metals_fetched": ["Gold", "Silver"],
        "status": "success"
    }

    return summary
