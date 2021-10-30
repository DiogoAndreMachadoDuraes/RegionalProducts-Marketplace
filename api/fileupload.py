import os
from flask.helpers import send_file
from flask_restful import Resource
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

UPLOAD_FOLDER = 'Files'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class FileUpload(Resource):

    def post(self):
        target=os.path.join(UPLOAD_FOLDER)
        if not os.path.isdir(target):
            os.mkdir(target)
        logger.info("welcome to upload`")
        file = request.files['file'] 
        filename = secure_filename(file.filename)
        destination="/".join([target, filename])
        file.save(destination)
        session['uploadFilePath']=destination
        fileurl = session['uploadFilePath']
        response = fileurl
        logger.info(fileurl)
        return response

class File(Resource):

    def get(self,destination,Files):

        final =   Files + "/" + destination
        
        return send_file(final)

    


if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="0.0.0.0",use_reloader=False)

CORS(app, expose_headers='Authorization')