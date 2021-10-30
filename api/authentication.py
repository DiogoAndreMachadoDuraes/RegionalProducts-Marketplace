from api.admin import Admin
from flask import Response, request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, create_refresh_token
from werkzeug.security import safe_str_cmp
from datetime import timedelta
from models.clients import ClientModel
from models.admin import AdminModel
from models.producer import ProducerModel
from api.errors import unauthorized

class Auth(Resource): 
    def post(self) -> Response: 
        data = request.get_json(force=True)
        client = ClientModel.find_by_email(data['email'])
        admin = AdminModel.find_by_email(data['email'])
        producer = ProducerModel.find_by_email(data['email'])


        if client:
            auth_success = client and safe_str_cmp(client.password, data['password'])

            if not auth_success:
                return unauthorized()
            else:
                expiry = timedelta(days=5)
                access_token = create_access_token(identity=str(client._id), expires_delta=expiry)
                
                return jsonify({'token': access_token,
                                'id': str(client._id),
                                'email': client.email, 
                                'name': f"{client.name}",
                                'type': "client"})
        else:
            if admin:
                auth_success = admin and safe_str_cmp(admin.password, data['password'])

                if not auth_success:
                    return unauthorized()
                else:
                    expiry = timedelta(days=5)
                    access_token = create_access_token(identity=str(admin._id), expires_delta=expiry)
                    return jsonify({'token': access_token,
                                    'id': str(admin._id),
                                    'email': admin.email,
                                    'name': f"{admin.name}",
                                    'type': "admin"})
            else:
                if producer:
                    auth_success = producer and safe_str_cmp(producer.password, data['password'])

                    if not auth_success:
                        return unauthorized()
                    else:
                        expiry = timedelta(days=5)
                        access_token = create_access_token(identity=str(producer._id), expires_delta=expiry)
                        return jsonify({'token': access_token,
                                        'id': str(producer._id),
                                        'email': producer.email,
                                        'name': f"{producer.name}",
                                        'type': "producer"})
                else:
                    return {'message': 'Invalid Credentials'}

""" class RefreshToken(Resource):
    @jwt_required(refresh=True)
    def post(self) -> Response:
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity, fresh=False)
        return jsonify(access_token=access_token) """
