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
        self.email_client = shop['email_client']
        self.pdf_invoice = shop['pdf_invoice']
        self.hour = shop['hour']
        self.id_client = shop['id_client']
        self.id_product = shop['id_product']
        self.photo_product = shop['photo_product']
        self.location_client = shop['location_client']
        self.telephone_client = shop['telephone_client']
        self.postal_code = shop['postal_code']
        self.price_final = shop['price_final']
        self.quantity_final = shop['quantity_final']
        self.address_client = shop['address_client']
        self.tax = shop['tax']
        self.tin_client = shop['tin_client']
        self.vat = shop['vat']
        self.avaliation = shop['avaliation']
        self.name_product = shop['name_product']

    def json(self):
        return {
            '_id': self.id,
            'country_client': self.country_client,
            'date': self.date,
            'pdf_invoice': self.pdf_invoice,
            'hour': self.hour,
            'id_client': self.id_client,
            'id_product':self.id_product,
            'photo_product':self.photo_product,
            'location_client':self.location_client,
            'email_client': self.email_client,
            'postal_code':self.postal_code,
            'price_final':self.price_final,
            'quantity_final': self.quantity_final,
            'address_client':self.address_client,
            'tax':self.tax,
            'tin_client':self.tin_client,
            'vat':self.vat,
            'avaliation': self.avaliation,
            'name_product': self.name_product,
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
    def find_all_shop_by_rate(cls, avaliation):
        shop = cls.shop.find({'avaliation': avaliation})
        return json.loads(dumps(shop)) if shop else None

    @classmethod
    def find_all_shop_by_id_producer(cls, id_product):
        shop = cls.shop.find({'id_product': id_product})
        return json.loads(dumps(shop)) if shop else None


    def insert_to_db(self):  
        self.shop.insert({  'country_client': self.country_client,
                            'date': self.date,
                            'pdf_invoice': self.pdf_invoice,
                            'hour': self.hour,
                            'id_client': self.id_client,
                            'id_product':self.id_product,
                            'photo_product':self.photo_product,
                            'location_client':self.location_client,
                            'email_client': self.email_client,
                            'postal_code':self.postal_code,
                            'price_final':self.price_final,
                            'quantity_final': self.quantity_final,
                            'address_client':self.address_client,
                            'tax':self.tax,
                            'tin_client':self.tin_client,
                            'vat':self.vat,
                            'avaliation': self.avaliation,
                            'name_product': self.name_product,
                            })


    def update_to_db(self):
        myquery = { "_id": ObjectId(self.id) }
        newvalues = { "$set": {
                                'country_client': self.country_client,
                                'date': self.date,
                                'pdf_invoice': self.pdf_invoice,
                                'hour': self.hour,
                                'id_client': self.id_client,
                                'id_product':self.id_product,
                                'photo_product':self.photo_product,
                                'location_client':self.location_client,
                                'email_client': self.email_client,
                                'postal_code':self.postal_code,
                                'price_final':self.price_final,
                                'quantity_final': self.quantity_final,
                                'address_client':self.address_client,
                                'tax':self.tax,
                                'tin_client':self.tin_client,
                                'vat':self.vat,
                                'avaliation': self.avaliation,
                                'name_product': self.name_product,
                            }}

        self.shop.update_one(myquery, newvalues)


    def delete_from_db(self):
        self.shop.delete_one({ "_id": ObjectId(self.id) })