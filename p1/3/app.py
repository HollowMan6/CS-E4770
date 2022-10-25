from flask import Flask, request, redirect, render_template
import random
import string
import psycopg2
import os

CREATE_SHORTEN_URL = (
    "INSERT INTO lookup (tag, url) VALUES (%s, %s)"
)
GET_SHORTEN_URL = (
    "SELECT url FROM lookup WHERE tag=%s"
)
GET_RANDOM_URL = (
    "SELECT url FROM lookup ORDER BY RANDOM() LIMIT 1"
)

url = os.environ.get("DATABASE_URL")
connection = psycopg2.connect(url)
app = Flask(__name__)

def makeid():
    return ''.join(random.choice(string.ascii_letters + string.digits + "_-") for _ in range(7))

@app.route("/", methods=['GET', 'POST'])
def shorten_url():
    statData = {
        "shortened": "",
        "url": "",
    }
    if request.method == 'POST':
        data = request.form
        url = data.get("url")
        statData["url"] = url
        with connection:
            with connection.cursor() as cursor:
                tag = makeid()
                cursor.execute(CREATE_SHORTEN_URL, (tag, url))
                statData["shortened"] = request.url + tag
    return render_template("index.html", **statData)

@app.get("/random")
def get_random():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GET_RANDOM_URL)
            res = cursor.fetchone()
            if res is None:
                return "Empty database", 404
            return redirect(res[0])

@app.get("/<tag>")
def get_room_all(tag):
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GET_SHORTEN_URL, (tag,))
            res = cursor.fetchone()
            if res is None:
                return "Not found", 404
            return redirect(res[0])
