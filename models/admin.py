from bson.json_util import json, dumps
from bson import ObjectId

from core.db import mongodb

class AdminModel():
  
    admin = mongodb['admin']

    def __init__(self, admin):
        self._id =  admin['_id']
        self.address = admin['address']
        self.country = admin['country']
        self.email = admin['email']
        self.location = admin['location']
        self.password = admin['password']
        self.postal_code = admin['postal_code']
        self.name = admin['name']
        self.telephone = admin['telephone']
        self.tin = admin['tin']

    def json(self):
        objectJson = {
            '_id': self._id,
            'address': self.address,
            'country': self.country,
            'location': self.location,
            'password': self.password,
            'postal_code': self.postal_code,
            'email': self.email,
            'name': self.name,
            'telephone': self.telephone,
            'tin': self.tin 
        }
        return json.loads(dumps(objectJson))

    def insert(self):
        objectJson = {
            'address': self.address,
            'country': self.country,
            'location': self.location,
            'password': self.password,
            'postal_code': self.postal_code,
            'email': self.email,
            'name': self.name,
            'telephone': self.telephone,
            'tin': self.tin, 
        }

        self.admin.insert(objectJson)

    def update(self):
        myquery = { "_id": ObjectId(self._id) }
        objectJson = {
            'address': self.address,
            'country': self.country,
            'location': self.location,
            'password': self.password,
            'postal_code': self.postal_code,
            'email': self.email,
            'name': self.name,
            'telephone': self.telephone,
            'tin': self.tin, 
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