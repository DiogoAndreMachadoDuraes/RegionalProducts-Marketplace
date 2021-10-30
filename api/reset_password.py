""" from flask import request, render_template
from flask.wrappers import Response
from flask_jwt_extended import create_access_token, decode_token
from models.clients import ClientModel
from models.producer import ProducerModel
from models.admin import AdminModel
from flask_restful import Resource
import datetime
from jwt.exceptions import ExpiredSignatureError, DecodeError, \
    InvalidTokenError
from services.mail_service import send_email
from werkzeug.security import safe_str_cmp
from api.errors import unauthorized

class ForgotPassword(Resource):
    def post(self) -> Response:
        url = request.host_url + 'reset/'
        data = request.get_json(force=True)
        client = ClientModel.find_by_email(data['email'])
        admin = AdminModel.find_by_email(data['email'])
        producer = ProducerModel.find_by_email(data['email'])

        if client:
            expires = datetime.timedelta(hours=24)
            reset_token = create_access_token(str(client.id), expires_delta=expires)

            return send_email('[WineOlive] Reset Your Password',
                            sender='support@wineolive.com',
                            recipients=[client.email],
                            text_body=render_template('email/reset_password.txt',
                                                        url=url + reset_token),
                            html_body=render_template('email/reset_password.html',
                                                        url=url + reset_token))
        else:
            if admin:
                expires = datetime.timedelta(hours=24)
                reset_token = create_access_token(str(admin.id), expires_delta=expires)

                return send_email('[WineOlive] Reset Your Password',
                                sender='support@wineolive.com',
                                recipients=[admin.email],
                                text_body=render_template('email/reset_password.txt',
                                                            url=url + reset_token),
                                html_body=render_template('email/reset_password.html',
                                                            url=url + reset_token))
            else:
                if producer:
                    expires = datetime.timedelta(hours=24)
                    reset_token = create_access_token(str(producer.id), expires_delta=expires)

                    return send_email('[WineOlive] Reset Your Password',
                                    sender='support@wineolive.com',
                                    recipients=[producer.email],
                                    text_body=render_template('email/reset_password.txt',
                                                                url=url + reset_token),
                                    html_body=render_template('email/reset_password.html',
                                                                url=url + reset_token))
                else:
                    return {'message': 'Invalid email'}

class ResetPassword(Resource):
    def post(self) -> Response:
        url = request.host_url + 'reset/'
        data = request.get_json(force=True)
        client = ClientModel.find_by_email(data['email'])
        admin = AdminModel.find_by_email(data['email'])
        producer = ProducerModel.find_by_email(data['email'])
        body = request.get_json()
        reset_token = body.get('reset_token')

        if client:
            auth = client and safe_str_cmp(client.password, data['password'])

            if not auth:
                return unauthorized()
            else:
                return send_email('[WineOlive] Reset Your Password',
                                sender='support@wineolive.com',
                                recipients=[client.email],
                                text_body=render_template('email/reset_password.txt',
                                                            url=url + reset_token),
                                html_body=render_template('email/reset_password.html',
                                                            url=url + reset_token))
        else:
            if admin:
                auth = client and safe_str_cmp(client.password, data['password'])

                if not auth:
                    return unauthorized()
                else:
                    return send_email('[WineOlive] Reset Your Password',
                                    sender='support@wineolive.com',
                                    recipients=[client.email],
                                    text_body=render_template('email/reset_password.txt',
                                                                url=url + reset_token),
                                    html_body=render_template('email/reset_password.html',
                                                                url=url + reset_token))
            else:
                if producer:
                    auth = client and safe_str_cmp(client.password, data['password'])

                    if not auth:
                        return unauthorized()
                    else:
                        return send_email('[WineOlive] Reset Your Password',
                                        sender='support@wineolive.com',
                                        recipients=[client.email],
                                        text_body=render_template('email/reset_password.txt',
                                                                    url=url + reset_token),
                                        html_body=render_template('email/reset_password.html',
                                                                    url=url + reset_token))
                else:
                    return {'message': 'Invalid authentication and password'} """
