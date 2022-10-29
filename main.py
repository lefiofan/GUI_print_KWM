import eel
import pyautogui as pyautogui
import requests

from loguru import logger
import configparser

config = configparser.ConfigParser()  # создаём объекта парсера
config.read("config.ini")  # читаем конфиг

logger.add("debug.log", format="{time} {level} {message}",
           level="DEBUG", rotation="10 MB", compression="zip")

eel.init('web')                     # Give folder containing web files


@eel.expose
def one_start():
    pyautogui.press('f11')





@logger.catch
@eel.expose
def tara_elem(strana: str):
    """
    Получает название страны и вытаскивает наименование тар и продукции
    :param strana: Страна
    :return: Список тар и наименования продукции
    """

    try:
        r = requests.get(f'http://127.0.0.1:8081/tara/{strana}')
        taras = r.json()
        u_taras = []
        for tara in taras:
            u_taras.append(tara["name"])
        return u_taras

    except:
        print('error')
        return 'error'

@eel.expose
def product_list(obiem: str, country: str):
    try:
        products = requests.get(f'http://127.0.0.1:8081/products/tara/{obiem}?country={country}').json()

        #response = requests.request("GET", config["API"]["url"], headers={'cache-control': "no-cache"}, params={f"country": {strana}, f"tara": {obiem}}).json()

        return products
    except:
        print('error')
        return 'error'


@eel.expose
def codes_list(product_name: str, product_volume: str, country: str):
    try:

        codes = requests.get(f'http://127.0.0.1:8081/code/codes/{product_volume}?name_product={product_name}&?country={country}').json()

        # response = requests.request("GET", config["API"]["url"], headers={'cache-control': "no-cache"}, params={f"country": {strana}, f"tara": {obiem}}).json()
        print(codes)
        print(type(codes))
        return codes
    except:
        print('error')
        return 'error'


eel.start('templates/hello.html', port=3211, size=(1000, 1000), jinja_templates='templates')    # Start