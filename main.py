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

    r = requests.get(f'http://127.0.0.1:8081/tara/{strana}')
    taras = r.json()

    querystring = {f"country": {strana}, "tara": ""}

    headers = {
        'cache-control': "no-cache",
    }

    try:

        #response = requests.request("GET", config["API"]["url"], headers=headers, params=querystring).json()
        u_taras = []
        for tara in taras:
            print(tara["name"])
            u_taras.append(tara["name"])

        return u_taras

    except:
        print('error')
        return 'error'

@eel.expose
def tara_name(obiem, strana):
    print(obiem)
    print(strana)
    try:
        response = requests.request("GET", config["API"]["url"], headers={'cache-control': "no-cache"}, params={f"country": {strana}, f"tara": {obiem}}).json()
        return response
    except:
        print('error')
        return 'error'

eel.start('templates/hello.html', port=3211, size=(700, 700), jinja_templates='templates')    # Start