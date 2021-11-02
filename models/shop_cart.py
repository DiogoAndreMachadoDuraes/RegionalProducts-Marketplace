# flask packages
from bson.json_util import json, dumps
from bson import ObjectId

# local packages
from core.db import mongodb

class Shop_CartModel():    
    shop_cart = mongodb['shop_cart']

    def __init__(self, shop_cart):
        self.id = str(shop_cart['_id'])
        self.id_client = shop_cart['id_client']
        self.email_client = shop_cart['email_client']
        self.id_product = shop_cart['id_product']
        self.name_product = shop_cart['name_product']
        self.photo_product = shop_cart['photo_product']
        self.price_product = shop_cart['price_product']
        self.quantity= shop_cart['quantity']

    def json(self):
        return {
          '_id':self.id,
         'id_client': self.id_client, 
         'email_client': self.email_client,
         'id_product': self.id_product,
         'name_product': self.name_product,
         'photo_product': self.photo_product,
         'price_product': self.price_product,
         'quantity': self.quantity
        }
       

    def insert(self):
         self.shop_cart.insert({
         'id_client': self.id_client, 
         'email_client': self.email_client,
         'id_product': self.id_product,
         'name_product': self.name_product,
         'photo_product': self.photo_product,
         'price_product': self.price_product,
         'quantity': self.quantity
        })
        

    def update(self):
        myquery = { "_id": ObjectId(self.id) }
        newvalues = { "$set": {
         'id_client': self.id_client,
         'email_client': self.email_client,
         'id_product': self.id_product,
         'name_product': self.name_product,
         'photo_product': self.photo_product,
         'price_product': self.price_product,
         'quantity': self.quantity,
         }}

        self.shop_cart.update(myquery, newvalues)

    def delete_from_db(self):
        self.shop_cart.delete_one({"_id" : ObjectId(self.id)})


    @classmethod
    def find_by_cart_id(cls, id):                           # Procurar cart pelo id
        shop_cart = cls.shop_cart.find_one({'_id' : ObjectId(id)}) 
        if shop_cart:
             return Shop_CartModel(shop_cart)
        else:
            return None

    @classmethod
    def find_all_cart_by_client(cls, id_client):                           # Procurar cart pelo id do cliente
        shop_cart = cls.shop_cart.find_one({'id_client' : id_client}) 
        if shop_cart:
             return Shop_CartModel(shop_cart)
        else:
            return None


   

    
      
