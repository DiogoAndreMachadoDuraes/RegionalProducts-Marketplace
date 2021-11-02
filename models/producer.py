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
        self.location = producer['location']
        self.name = producer['name']
        self.postal_code = producer['postal_code']
        self.region = producer['region']
        self.social_network = producer['social_network']
        self.state = producer['state']
        self.address = producer['address']
        self.telephone = producer['telephone']

    def json(self):
        objectJson = {
            '_id': self._id,
            'email': self.email,
            'logo' : self.logo,
            'password': self.password,
            'country': self.country,
            'location': self.location,
            'name': self.name,
            'postal_code': self.postal_code,
            'region': self.region,
            'social_network': self.social_network,
            'state': self.state,
            'address': self.address,
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
            'location': self.location,
            'name': self.name,
            'postal_code': self.postal_code,
            'region': self.region,
            'social_network': self.social_network,
            'state': self.state,
            'address': self.address,
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
            'location': self.location,
            'name': self.name,
            'postal_code': self.postal_code,
            'region': self.region,
            'social_network': self.social_network,
            'state': self.state,
            'address': self.address,
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