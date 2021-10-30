from flask_restful import Resource, request
from flask_jwt import JWT
from bson import ObjectId
from flask_jwt_extended import jwt_required
from flask import jsonify
''' from db.client import ClientsModel '''
from schemas.client import ClientSchema
from models.clients import ClientModel

class Client(Resource):

    @jwt_required()
    def get(self, client_id):        
        #data = request.get_json(force=True)
        client = ClientModel.find_by_id(client_id)
        if client:
            return jsonify(client.json())
        else: 
            return {'message': 'Cliente nao encontrado'}
    
    @jwt_required()
    def put(self):
        data = request.get_json(force=True)
        client = ClientModel.find_by_id(data['_id'])
        if client:
            clientUpdate = ClientModel(data)
            clientUpdate.update()
            return {'message': 'Client {} has been modify'.format(data['_id'])}
        else: 
            return {'message': 'Cliente nao encontrado'}
    
    @jwt_required()
    def delete(self):
        data = request.get_json(force=True)
        client = ClientModel.find_by_id(data['_id'])
        if client:
            client.delete()
            return {'message': 'Client {} has been deleted'.format(data['_id'])}

class ClientRegister(Resource):

    def post(self):
        data = request.get_json(force=True)
        if ClientModel.find_by_name(data['name']):
            return {'message': 'Name is existed, please use another name.'}, 400
        data['_id'] = 0
        client = ClientModel(data)
        client.insert()

        return {'message': 'Client has been created successfully.'}, 201

class ClientList(Resource):
    
    def get(self):
        client = ClientModel.find_all()
        return client