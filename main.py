# Importiert notwendige Module und Pakete
import random
# from threading import Thread, Event
from flask import Flask, request, render_template, redirect, url_for, jsonify



# Initialisiert die Flask-App
app = Flask(__name__)



""" ---- HTML Funktionen ---- """
# Definiert die Route für die Startseite
@app.route('/')
def index():
    return render_template("index.html")
    # return render_template("index.html", playback_queue=current_queue, files=mp3_files, current_song=current_song)


# Definiert eine benutzerdefinierte Fehlerseite für den HTTP-Statuscode 404
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


# Startet die Flask-App und den Audio-Player-Thread
if __name__ == '__main__':
    
    # Startet die Flask-App
    app.config.update(
        TEMPLATES_AUTO_RELOAD = True
    )
    app.register_error_handler(404, page_not_found)  # Registriert die benutzerdefinierte Fehlerseite
    app.run(host='0.0.0.0', port=5000)
