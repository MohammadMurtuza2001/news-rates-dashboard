
NEWS_SOURCES = [
    # -- Existing Tribune feeds (slugs kept stable for existing callers) --
    {
        "slug": "latest",
        "label": "Tribune Latest",
        "url": "https://tribune.com.pk/feed/latest",
        "source": "Tribune Latest",
    },
    {
        "slug": "pakistan",
        "label": "Tribune Pakistan",
        "url": "https://tribune.com.pk/feed/pakistan",
        "source": "Tribune Pakistan",
    },
    {
        "slug": "world",
        "label": "Tribune World",
        "url": "https://tribune.com.pk/feed/world",
        "source": "Tribune World",
    },
    {
        "slug": "games",
        "label": "Tribune Games",
        "url": "https://tribune.com.pk/feed/games",
        "source": "Tribune Games",
    },

    # -- New feeds from for_later.txt --
    {
        "slug": "geo-pakistan",
        "label": "Geo News Pakistan",
        "url": "https://feeds.feedburner.com/geo/GiKR",
        "source": "Geo News Pakistan",
    },
    {
        "slug": "geo-world",
        "label": "Geo News World",
        "url": "https://feeds.feedburner.com/geo/wUIl",
        "source": "Geo News World",
    },
    {
        "slug": "jang-tech",
        "label": "Jang Tech",
        "url": "https://jang.com.pk/en/rss/162",
        "source": "Jang Tech",
    },
    {
        "slug": "ign-tech",
        "label": "IGN Tech",
        "url": "https://feeds.feedburner.com/ign/tech-articles",
        "source": "IGN Tech",
    },
    {
        "slug": "ign-games",
        "label": "IGN Games",
        "url": "https://feeds.feedburner.com/ign/games-all",
        "source": "IGN Games",
    },
    {
        "slug": "ign-movies",
        "label": "IGN Movies",
        "url": "https://feeds.feedburner.com/ign/movies-articles",
        "source": "IGN Movies",
    },
    {
        "slug": "theverge-games",
        "label": "TheVerge Games",
        "url": "https://www.theverge.com/rss/games/index.xml",
        "source": "TheVerge Games",
    },
    {
        "slug": "theverge-ai",
        "label": "TheVerge AI",
        "url": "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
        "source": "TheVerge AI",
    },
]

# slug -> DB `source` value, used to validate/filter ?category= requests
CATEGORY_SOURCES = {entry["slug"]: entry["source"] for entry in NEWS_SOURCES}

# (url, source) pairs, used by the refresh job to fetch + tag articles
REFRESH_SOURCES = [(entry["url"], entry["source"]) for entry in NEWS_SOURCES]
