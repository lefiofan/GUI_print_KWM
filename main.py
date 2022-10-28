import random

import pyautogui as pyautogui
import requests
import eel

eel.init('web')                     # Give folder containing web files

@eel.expose
def py_random():
    return random.random()


@eel.expose
def one_start():
    pyautogui.press('f11')


r = requests.get('http://192.168.31.225:8000/country')
te = r.json()
for country in te:
    country = country["name"]
    eel.create_Country_in_dom(country)

eel.start('templates/hello.html', port=3211, size=(700, 700), jinja_templates='templates')    # Start