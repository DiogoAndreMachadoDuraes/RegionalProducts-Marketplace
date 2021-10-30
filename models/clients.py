from bson.json_util import json, dumps
from bson import ObjectId

from core.db import mongodb

class ClientModel():
  
    clients = mongodb['client']

    def __init__(self, client):
        self._id =  client['_id']
        self.tin = client['tin']
        self.name = client['name']
        self.birthday = client['birthday']
        self.telephone = client['telephone']
        self.street = client['street']
        self.locality = client['locality']
        self.country = client['country']
        self.postal_code = client['postal_code']
        self.email = client['email']
        self.password = client['password']
        self.state = client['state']

    def json(self):
        objectJson = {
            '_id': self._id,
            'tin': self.tin,
            'name': self.name,
            'birthday': self.birthday,
            'telephone': self.telephone,
            'street': self.street,
            'locality': self.locality,
            'country': self.country,
            'postal_code': self.postal_code,
            'password': self.password,
            'email': self.email,
            'state': self.state  
        }
        return json.loads(dumps(objectJson))

    def insert(self):
        objectJson = {
            'tin': self.tin,
            'name': self.name,
            'birthday': self.birthday,
            'telephone': self.telephone,
            'street': self.street,
            'locality': self.locality,
            'country': self.country,
            'postal_code': self.postal_code,
            'email': self.email,
            'password': self.password,
            'state': self.state
        }

        self.clients.insert(objectJson)

    def update(self):
        myquery = { "_id": ObjectId(self._id) }
        objectJson = {
            'tin': self.tin,
            'name': self.name,
            'birthday': self.birthday,
            'telephone': self.telephone,
            'street': self.street,
            'locality': self.locality,
            'country': self.country,
            'postal_code': self.postal_code,
            'email': self.email,
            'password': self.password,
            'state': self.state
        }
        newvalues = { "$set": objectJson }

        self.clients.update(myquery, newvalues)

    def delete(self):
        self.clients.delete_one({ "_id": ObjectId(self._id) })
    
    @classmethod
    def find_by_id(cls, _id):
        client = cls.clients.find_one({'_id': ObjectId(_id)})

        if client:
            return ClientModel(client)
        else:
            return None

    @classmethod
    def find_by_name(cls, name):
        client = cls.clients.find_one({'name': name})

        if client:
            return ClientModel(client)
        else:
            return None
    
    @classmethod
    def find_by_email(cls, email):
        client = cls.clients.find_one({'email': email})

        if client:
            return ClientModel(client)
        else:
            return None
    
    @classmethod
    def find_all(cls):
        clients = cls.clients.find()
        return json.loads(dumps(clients)) if clients else None