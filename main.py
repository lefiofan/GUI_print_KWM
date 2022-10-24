import random
import requests
import eel

eel.init('web')                     # Give folder containing web files

@eel.expose
def py_random():
    return random.random()

@eel.expose                         # Expose this function to Javascript
def say_hello_py(x):
    print('Hello from %s' % x)

say_hello_py('Python World!')
r = requests.get('http://0.0.0.0:8000/country')
te = r.json()
eel.say_hello_js(te)   # Call a Javascript function

eel.start('templates/hello.html', port=3211, size=(700, 700), jinja_templates='templates')    # Start