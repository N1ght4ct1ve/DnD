from flask import Flask, render_template, request, redirect, url_for
from flask_uploads import UploadSet, configure_uploads, IMAGES
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage

import os

app = Flask(__name__)

# Konfiguration für das Hochladen von Bildern
photos = UploadSet('photos', IMAGES)
app.config['UPLOADED_PHOTOS_DEST'] = 'static/uploads'
configure_uploads(app, photos)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST' and 'background' in request.files:
        filename = photos.save(request.files['background'], name=secure_filename(request.files['background'].filename))
        return render_template('index.html', background=filename)
    return render_template('index.html', background=None)

@app.route('/upload', methods=['POST'])
def upload():
    if 'image' in request.files:
        filename = photos.save(request.files['image'], name=secure_filename(request.files['image'].filename))
        return filename
    return 'Failed', 400

if __name__ == '__main__':
    app.run(debug=True)
