from bson.json_util import json, dumps
from bson import ObjectId

from core.db import mongodb

class AdminModel():
  
    admin = mongodb['admin']

    def __init__(self, admin):
        self._id =  admin['_id']
        self.email = admin['email']
        self.password = admin['password']
        self.name = admin['name']
        self.telephone = admin['telephone']

    def json(self):
        objectJson = {
            '_id': self._id,
            'password': self.password,
            'email': self.email,
            'name': self.name,
            'telephone': self.telephone 
        }
        return json.loads(dumps(objectJson))

    def insert(self):
        objectJson = {
            'name': self.name,
            'telephone': self.telephone,
            'email': self.email,
            'password': self.password,
        }

        self.admin.insert(objectJson)

    def update(self):
        myquery = { "_id": ObjectId(self._id) }
        objectJson = {
            'email': self.email,
            'password': self.password,
            'telephone': self.telephone,
            'name': self.name
        }
        newvalues = { "$set": objectJson }

        self.admin.update(myquery, newvalues)

    def delete(self):
        self.admin.delete_one({ "_id": ObjectId(self._id) })
    
    @classmethod
    def find_by_id(cls, _id):
        admin = cls.admin.find_one({'_id': ObjectId(_id)})

        if admin:
            return AdminModel(admin)
        else:
            return None

    @classmethod
    def find_by_name(cls, name):
        admin = cls.admin.find_one({'name': name})

        if admin:
            return AdminModel(admin)
        else:
            return None
    
    @classmethod
    def find_by_email(cls, email):
        admin = cls.admin.find_one({'email': email})

        if admin:
            return AdminModel(admin)
        else:
            return None