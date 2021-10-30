# flask packages
from bson.json_util import json, dumps
from bson import ObjectId

# local packages
from core.db import mongodb

class CartsModel():    
    carts = mongodb['cart']

    def __init__(self, cart):
        self.id = str(cart['_id'])
        self.id_client = cart['id_client']
        self.email_client = cart['email_client']
        self.products = cart['products']
    

    def json(self):
        return {
          '_id':self.id,
         'id_client': self.id_client, 
         'email_client': self.email_client,
         'products': self.products}
       

    def insert(self):
         self.carts.insert({
         'id_client': self.id_client, 
         'email_client': self.email_client,
         'products': self.products})
        

    def update(self):
        myquery = { "_id": ObjectId(self.id) }
        newvalues = { "$set": {
         'id_client': self.id_client,
         'email_client': self.email_client,
         'products': self.products,}}

        self.carts.update(myquery, newvalues)

    def delete_from_db(self):
        self.carts.delete_one({"_id" : ObjectId(self.id)})


    @classmethod
    def find_by_cart_id(cls, id):                           # Procurar cart pelo id
        carts = cls.carts.find_one({'_id' : ObjectId(id)}) 
        if carts:
             return CartsModel(carts)
        else:
            return None

    @classmethod
    def find_all_cart_by_client(cls, id_client):                           # Procurar cart pelo id do cliente
        carts = cls.carts.find_one({'id_client' : id_client}) 
        if carts:
             return CartsModel(carts)
        else:
            return None


   

    
      
