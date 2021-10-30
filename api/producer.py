from flask_restful import Resource, request
from flask_jwt import JWT
from bson import ObjectId
from flask import jsonify
from flask_jwt_extended import jwt_required
from schemas.producer import ProducerSchema
from models.producer import ProducerModel

class Producer(Resource):

    @jwt_required()
    def get(self, producer_id):        
        producer = ProducerModel.find_by_id(producer_id)
        if producer:
            return jsonify(producer.json())
        else: 
            return {'message': 'Producer not found'}
    
    @jwt_required()
    def put(self):
        data = request.get_json(force=True)
        producer = ProducerModel.find_by_id(data['_id'])
        if producer:
            producerUpdate = ProducerModel(data)
            producerUpdate.update()
            return {'message': 'Producer {} has been modify'.format(data['_id'])}
        else: 
            return {'message': 'Producer not found'}
    
    @jwt_required()
    def delete(self):
        data = request.get_json(force=True)
        producer = ProducerModel.find_by_id(data['_id'])
        if producer:
            producer.delete()
            return {'message': 'Producer {} has been deleted'.format(data['_id'])}

class ProducerRegister(Resource):

    def post(self):
        data = request.get_json(force=True)
        if ProducerModel.find_by_name(data['name']):
            return {'message': 'Name is existed, please use another name.'}, 400
        data['_id'] = 0
        producer = ProducerModel(data)
        producer.insert()

        return {'message': 'Producer has been created successfully.'}, 201

class ProducerList(Resource):

    @jwt_required()
    def get(self):
        producer = ProducerModel.find_all()
        return producer