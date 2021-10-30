# flask packages
from bson.json_util import json, dumps
from bson import ObjectId
from flask_jwt_extended import jwt_required

# local packages
from core.db import mongodb
from schemas.shop import shopschema

class ShopModel():
    shop = mongodb['shop']

    def __init__(self, shop):
        self.id = str(shop['_id'])
        self.country_client = shop['country_client']
        self.date = shop['date']
        self.doc_invoice = shop['doc_invoice']
        self.hour = shop['hour']
        self.id_client = shop['id_client']
        self.id_producer = shop['id_producer']
        self.locality_client = shop['locality_client']
        self.name_client = shop['name_client']
        self.postal_code_client = shop['postal_code_client']
        self.price = shop['price']
        self.quantity = shop['quantity']
        self.street_client = shop['street_client']
        self.tax = shop['tax']
        self.tin_client = shop['tin_client']
        self.vat = shop['vat']
        self.rate = shop['rate']
        self.products = shop['products']

    def json(self):
        return {
            '_id': self.id,
            'country_client': self.country_client,
            'date': self.date,
            'doc_invoice': self.doc_invoice,
            'hour': self.hour,
            'id_client': self.id_client,
            'id_producer':self.id_producer,
            'locality_client':self.locality_client,
            'name_client': self.name_client,
            'postal_code_client':self.postal_code_client,
            'price':self.price,
            'quantity': self.quantity,
            'street_client':self.street_client,
            'tax':self.tax,
            'tin_client':self.tin_client,
            'vat':self.vat,
            'rate': self.rate,
            'products': self.products,
             }

    @classmethod
    def find_by_shop_id(cls, id):                           
        shop = cls.shop.find_one({'_id' : ObjectId(id)}) 
        if shop:
            return ShopModel(shop)
        else:
            return None

    @classmethod
    def find_all_shop_by_date(cls, date):         
        shop = cls.shop.find({'date' : date}) 
        return json.loads(dumps(shop)) if shop else None 

   # @classmethod                                             
    #def find_all_shop_by_client(cls, id_client):
        shop = cls.shop.find({'id_client' : id_client}) 
        return json.loads(dumps(shop)) if shop else None

    @classmethod
    def find_all_shop(cls):             
        shop = cls.shop.find()
        return json.loads(dumps(shop)) if shop else None

    @classmethod
    def find_all_shop_by_client(cls, id_client):                          
        shop = cls.shop.find({'id_client' : id_client}) 
        return json.loads(dumps(shop)) if shop else None

    @classmethod
    def find_all_shop_by_rate(cls, rate):
        shop = cls.shop.find({'rate': rate})
        return json.loads(dumps(shop)) if shop else None

    @classmethod
    def find_all_shop_by_id_producer(cls, id_producer):
        shop = cls.shop.find({'id_producer': id_producer})
        return json.loads(dumps(shop)) if shop else None


    def insert_to_db(self):  
        self.shop.insert({  'country_client': self.country_client,
                            'date': self.date,
                            'doc_invoice': self.doc_invoice,
                            'hour': self.hour,
                            'id_client': self.id_client,
                            'id_producer':self.id_producer,
                            'locality_client': self.locality_client,
                            'name_client': self.name_client,
                            'postal_code_client': self.postal_code_client,
                            'price': self.price,
                            'quantity': self.quantity,
                            'street_client':self.street_client,
                            'tax':self.tax,
                            'tin_client': self.tin_client,
                            'vat': self.vat,
                            'rate': self.rate,
                            'products': self.products,
                            })


    def update_to_db(self):
        myquery = { "_id": ObjectId(self.id) }
        newvalues = { "$set": {
                            'country_client': self.country_client,
                            'date': self.date,
                            'doc_invoice': self.doc_invoice,
                            'hour': self.hour,
                            'id_client': self.id_client,
                            'id_producer':self.id_producer,
                            'locality_client': self.locality_client,
                            'name_client': self.name_client,
                            'postal_code_client':self.postal_code_client,
                            'price':self.price,
                            'quantity': self.quantity,
                            'street_client':self.street_client,
                            'tax':self.tax,
                            'tin_client':self.tin_client,
                            'vat':self.vat,
                            'rate': self.rate,
                            'products': self.products,
                            }}

        self.shop.update_one(myquery, newvalues)


    def delete_from_db(self):
        self.shop.delete_one({ "_id": ObjectId(self.id) })