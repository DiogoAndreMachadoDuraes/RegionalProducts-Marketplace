# flask packages
from bson.json_util import json, dumps
from bson import ObjectId
from flask_jwt_extended import jwt_required
# local packages
from core.db import mongodb

class ProductModel():
    product = mongodb['product']

    def __init__(self, product):
        self.id = str(product['_id'])
        self.name = product['name']
        self.quantity = product['quantity']
        self.validity = product['validity']
        self.harvest_date = product['harvest_date']
        self.category = product['category']
        self.price = product['price']
        self.photo = product['photo']
        self.stock = product['stock']
        self.id_producer = product['id_producer']
        self.logo_producer = product['logo_producer']
        self.name_producer = product['name_producer']
        self.email_producer = product['email_producer']

    def json(self):
        return {
            '_id': self.id,
            'name': self.name,
            'quantity': self.quantity,
            'validity': self.validity,
            'harvest_date': self.harvest_date,
            'category': self.category,
            'price':self.price,
            'photo': self.photo,
            'stock': self.stock,
            'id_producer':self.id_producer,
            'logo_producer':self.id_producer,
            'name_producer': self.name_producer,
            'email_producer': self.email_producer
             }

    @classmethod
    def find_by_product_id(cls, id):                           # Procurar produto pelo id
        product = cls.product.find_one({'_id' : ObjectId(id)}) 
        if product:
            return ProductModel(product)
        else:
            return None

    @classmethod
    def find_all_product_by_category(cls, category):         # Procurar todos os produtos por uma categoria
        product = cls.product.find({'category' : category}) 
        return json.loads(dumps(product)) if product else None 


    @classmethod                                             # Procurar todos os produtos por produtor
    def find_all_product_by_producer(cls, id_producer):
        product = cls.product.find({'id_producer' : id_producer}) 
        return json.loads(dumps(product)) if product else None

    @classmethod                                             # Procurar todos os produtos por produtor e categoria
    def find_all_product_by_producer_and_category(cls, id_producer,category):
        product = cls.product.find({'id_producer' : id_producer, 'category' : category}) 
        return json.loads(dumps(product)) if product else None


    @classmethod
    def find_all_product(cls):               # Procurar todos os produtos 
        product = cls.product.find()
        return json.loads(dumps(product)) if product else None


    def insert_to_db(self):  # inserting data
        self.product.insert({'name': self.name,
                            'quantity': self.quantity,
                            'validity': self.validity,
                            'harvest_date': self.harvest_date,
                            'category': self.category,
                            'price':self.price,
                            'photo': self.photo,
                            'stock': self.stock,
                            'id_producer':self.id_producer,
                            'logo_producer':self.id_producer,
                            'name_producer': self.name_producer,
                            'email_producer': self.email_producer
                            })


    def update_to_db(self):
        myquery = { "_id": ObjectId(self.id) }
        newvalues = { "$set": {
                            'name': self.name,
                            'quantity': self.quantity,
                            'validity': self.validity,
                            'harvest_date': self.harvest_date,
                            'category': self.category,
                            'price':self.price,
                            'photo': self.photo,
                            'stock': self.stock,
                            'id_producer':self.id_producer,
                            'logo_producer':self.id_producer,
                            'name_producer': self.name_producer,
                            'email_producer': self.email_producer}}

        self.product.update_one(myquery, newvalues)


    def delete_from_db(self):
        self.product.delete_one({ "_id": ObjectId(self.id) })