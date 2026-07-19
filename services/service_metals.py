import requests

gold_url = "https://beta-restapi.sarmaaya.pk/api/commodities/gold"
silver_url = "https://beta-restapi.sarmaaya.pk/api/commodities/xag"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Referer": "https://sarmaaya.pk/commodities"
}

def get_gold_price():
    response = requests.get(gold_url, headers=headers)
    data = response.json()
    gold_data = data["response"][0]
    data_dict = {
        "price1Tola": gold_data["price1Tola"], "price1g": gold_data["price1g"]}
    return data_dict


def get_silver_price():
    response = requests.get(silver_url, headers=headers)
    data = response.json()
    silver_data = data["response"][0]
    data_dict = {
        "price1Tola": silver_data["price1Tola"], "price1g": silver_data["price1g"]}
    return data_dict
