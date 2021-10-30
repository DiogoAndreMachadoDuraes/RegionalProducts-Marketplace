from bson.json_util import json, dumps
from bson import ObjectId

from core.db import mongodb

class ProducerModel():
  
    producer = mongodb['producer']

    def __init__(self, producer):
        self._id =  producer['_id']
        self.logo = producer['logo']
        self.email = producer['email']
        self.tin = producer['tin']
        self.password = producer['password']
        self.country= producer['country']
        self.locality = producer['locality']
        self.name = producer['name']
        self.postal_code = producer['postal_code']
        self.social = producer['social']
        self.state = producer['state']
        self.street = producer['street']
        self.telephone = producer['telephone']

    def json(self):
        objectJson = {
            '_id': self._id,
            'email': self.email,
            'logo' : self.logo,
            'password': self.password,
            'country': self.country,
            'locality': self.locality,
            'name': self.name,
            'postal_code': self.postal_code,
            'social': self.social,
            'state': self.state,
            'street': self.street,
            'telephone': self.telephone,
            'tin' : self.tin
        }
        return json.loads(dumps(objectJson))

    def insert(self):
        objectJson = {
            'email': self.email,
            'logo' : self.logo,
            'password': self.password,
            'country': self.country,
            'locality': self.locality,
            'name': self.name,
            'postal_code': self.postal_code,
            'social': self.social,
            'state': self.state,
            'street': self.street,
            'telephone': self.telephone,
            'tin' : self.tin
        }

        self.producer.insert(objectJson)

    def update(self):
        myquery = { "_id": ObjectId(self._id) }
        objectJson = {
            'email': self.email,
            'logo' : self.logo,
            'password': self.password,
            'country': self.country,
            'locality': self.locality,
            'name': self.name,
            'postal_code': self.postal_code,
            'social': self.social,
            'state': self.state,
            'street': self.street,
            'telephone': self.telephone,
            'tin' : self.tin
        }
        newvalues = { "$set": objectJson }

        self.producer.update(myquery, newvalues)

    def delete(self):
        self.producer.delete_one({ "_id": ObjectId(self._id) })
    
    @classmethod
    def find_by_id(cls, _id):
        producer = cls.producer.find_one({'_id': ObjectId(_id)})

        if producer:
            return ProducerModel(producer)
        else:
            return None

    @classmethod
    def find_by_name(cls, name):
        producer = cls.producer.find_one({'name': name})

        if producer:
            return ProducerModel(producer)
        else:
            return None
    
    @classmethod
    def find_by_email(cls, email):
        producer = cls.producer.find_one({'email': email})

        if producer:
            return ProducerModel(producer)
        else:
            return None
    
    @classmethod
    def find_all(cls):
        producers = cls.producer.find()
        return json.loads(dumps(producers)) if producers else None