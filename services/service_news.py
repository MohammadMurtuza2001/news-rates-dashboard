import feedparser


def feed_fetcher(feed_url, source_name):
    feed = feedparser.parse(feed_url)
    list_of_feeds = []
    for f in feed.entries[0:10]:
        feed_dict = {"title": f.title, "link": f.link, "summary": f.summary,
                     "source": source_name, "published": f.get("published", "unknown")}
        list_of_feeds.append(feed_dict)
    return list_of_feeds
