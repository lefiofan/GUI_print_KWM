import eel
import pyautogui as pyautogui
import requests
import socket
from loguru import logger
import configparser

config = configparser.ConfigParser()  # создаём объекта парсера
config.read("config.ini")  # читаем конфиг

logger.add("debug.log", format="{time} {level} {message}",
           level="DEBUG", rotation="10 MB", compression="zip")


TCP_IP = '192.168.31.100'
TCP_PORT = 9100
BUFFER_SIZE = 1024


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
        taras = requests.get(f'http://127.0.0.1:8081/tara/{strana}').json()
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
        return products
    except:
        return 'error'

@eel.expose
def codes_list(product_gtin: str):
    try:

        return requests.get(f'http://127.0.0.1:8081/code/codes/{product_gtin}').json()

    except:
        return 'error'

@eel.expose
def print_gtin(code, s):
    try:
        zpl = f"""
        ^XA
        ^FO60,40^BY3
        ^BXN,6,200,,,,,1
        ^FD{code}
        ^FS
        ^XZ 
        """

        s.send(bytes(zpl, "utf-8"))

    except Exception as e:
        print(e)
@eel.expose
def test_print(codes: list):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((TCP_IP, TCP_PORT))

    for cod in codes:
        # Отправка на печатать
        print_gtin(str(cod), s)
    s.close()
@eel.expose
def print_code_tara(codes_list: list):
    logger.info(codes_list)


    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((TCP_IP, TCP_PORT))
    for code in codes_list:


        logger.info(code)
        print_gtin(str(code), s)
    s.close()




eel.start('templates/hello.html', mode='chrome', port=3211, size=(1000, 1000), jinja_templates='templates', cmdline_args=['--start-fullscreen'])    # Start