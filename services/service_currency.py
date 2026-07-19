import requests

currency_url = "https://beta-restapi.sarmaaya.pk/api/forex"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Referer": "https://sarmaaya.pk/commodities"
}

def get_currency_rates():
    wanted = ["USD/PKR", "EUR/PKR", "GBP/PKR", "SAR/PKR", "AED/PKR", "BHD/PKR", "CAD/PKR", "INR/PKR", "JPY/PKR", "KWD/PKR", "OMR/PKR", "QAR/PKR"]
    list_of_currencies = []
    response = requests.get(currency_url, headers=headers)
    data = response.json()
    for currency in data["response"]["forexList"]:
        if currency["pairs"] in wanted:
            pairs = currency["pairs"]
            name = currency["name"]
            ask_price = currency["askPrice"]
            bid_price = currency["bidPrice"]
            average_rate = (ask_price + bid_price) / 2
            data_dict = {"pairs": pairs, "name": name, "rate": average_rate}
            list_of_currencies.append(data_dict)
    return list_of_currencies
