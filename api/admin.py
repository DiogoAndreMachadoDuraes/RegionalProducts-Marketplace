from flask_restful import Resource, request
from flask_jwt import JWT
from bson import ObjectId
from flask_jwt_extended import jwt_required
from schemas.admin import AdminSchema
from models.admin import AdminModel

class Admin(Resource):

    @jwt_required()
    def get(self):        
        data = request.get_json(force=True)
        admin = AdminModel.find_by_id(data['_id'])
        if admin:
            return admin.json()
        else: 
            return {'message': 'Administrador not found'}
    
    @jwt_required()
    def put(self):
        data = request.get_json(force=True)
        admin = AdminModel.find_by_id(data['_id'])
        if admin:
            adminUpdate = AdminModel(data)
            adminUpdate.update()
            return {'message': 'Adminstrator {} has been modify'.format(data['_id'])}
        else: 
            return {'message': 'Administrator not found'}
    
    @jwt_required()
    def delete(self):
        data = request.get_json(force=True)
        admin = AdminModel.find_by_id(data['_id'])
        if admin:
            admin.delete()
            return {'message': 'Administrator {} has been deleted'.format(data['_id'])}

class AdminRegister(Resource):

    def post(self):
        data = request.get_json(force=True)
        if AdminModel.find_by_name(data['name']):
            return {'message': 'Name is existed, please use another name.'}, 400
        data['_id'] = 0
        admin = AdminModel(data)
        admin.insert()

        return {'message': 'Adminstrator has been created successfully.'}, 201