# flask packages
from bson.json_util import json, dumps
from bson import ObjectId
from flask_jwt_extended import jwt_required
# local packages
from core.db import mongodb

class ProductsModel():
    products = mongodb['product']

    def __init__(self, product):
        self.id = str(product['_id'])
        self.name = product['name']
        self.type = product['type']
        self.quantity = product['quantity']
        self.validity = product['validity']
        self.harvest = product['harvest']
        self.category = product['category']
        self.alcohol_content = product['alcohol_content']
        self.acidity = product['acidity']
        self.price = product['price']
        self.photo = product['photo']
        self.stock = product['stock']
        self.id_producer = product['id_producer']
        self.logo_producer = product['logo_producer']
        self.name_producer = product['name_producer']

    def json(self):
        return {
            '_id': self.id,
            'name': self.name,
            'type': self.type,
            'quantity': self.quantity,
            'validity': self.validity,
            'harvest': self.harvest,
            'category': self.category,
            'alcohol_content': self.alcohol_content,
            'acidity':self.acidity,
            'price':self.price,
            'photo': self.photo,
            'stock': self.stock,
            'id_producer':self.id_producer,
            'logo_producer':self.id_producer,
            'name_producer': self.name_producer
             }

    @classmethod
    def find_by_product_id(cls, id):                           # Procurar produto pelo id
        product = cls.products.find_one({'_id' : ObjectId(id)}) 
        if product:
            return ProductsModel(product)
        else:
            return None

    @classmethod
    def find_all_products_by_category(cls, category):         # Procurar todos os produtos por uma categoria
        products = cls.products.find({'category' : category}) 
        return json.loads(dumps(products)) if products else None 

    @classmethod                                             # Procurar todos os produtos por tipo
    def find_all_products_by_type(cls, type):
        products = cls.products.find({'type' : type}) 
        return json.loads(dumps(products)) if products else None

    @classmethod                                             # Procurar todos os produtos por produtor
    def find_all_products_by_producer(cls, id_producer):
        products = cls.products.find({'id_producer' : id_producer}) 
        return json.loads(dumps(products)) if products else None

    @classmethod                                             # Procurar todos os produtos por produtor e categoria
    def find_all_products_by_producer_and_category(cls, id_producer,category):
        products = cls.products.find({'id_producer' : id_producer, 'category' : category}) 
        return json.loads(dumps(products)) if products else None

    @classmethod                                             # Procurar todos os produtos por produtor e tipo
    def find_all_products_by_producer_and_type(cls, id_producer,type):
        products = cls.products.find({'id_producer' : id_producer, 'type' : type}) 
        return json.loads(dumps(products)) if products else None



    @classmethod
    def find_all_products(cls):               # Procurar todos os produtos 
        products = cls.products.find()
        return json.loads(dumps(products)) if products else None


    def insert_to_db(self):  # inserting data
        self.products.insert({'name': self.name,
                            'type': self.type,
                            'quantity': self.quantity,
                            'validity': self.validity,
                            'harvest': self.harvest,
                            'category': self.category,
                            'alcohol_content': self.alcohol_content,
                            'acidity':self.acidity,
                            'price':self.price,
                            'photo': self.photo,
                            'stock': self.stock,
                            'id_producer':self.id_producer,
                            'logo_producer':self.id_producer,
                            'name_producer': self.name_producer
                            })


    def update_to_db(self):
        myquery = { "_id": ObjectId(self.id) }
        newvalues = { "$set": {
                            'name': self.name,
                            'type': self.type,
                            'quantity': self.quantity,
                            'validity': self.validity,
                            'harvest': self.harvest,
                            'category': self.category,
                            'alcohol_content': self.alcohol_content,
                            'price':self.price,
                            'photo': self.photo,
                            'stock': self.stock,
                            'id_producer':self.id_producer,
                            'logo_producer':self.id_producer,
                            'name_producer': self.name_producer }}

        self.products.update_one(myquery, newvalues)


    def delete_from_db(self):
        self.products.delete_one({ "_id": ObjectId(self.id) })