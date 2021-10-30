# flask packages
from bson.json_util import json, dumps
from bson import ObjectId
from flask_jwt_extended import jwt_required
# local packages
from core.db import mongodb
from schemas.favorite import favoriteschema


class FavoritesModel():
    favorites = mongodb['favorite']

    def __init__(self, favorite):
        self.id = str(favorite['_id'])
        self.date = favorite['date']
        self.id_client = favorite ['id_client']
        self.products = favorite['products']
      

    def json(self):
        return {
            '_id': self.id,
            'date': self.date,
            'id_client': self.id_client,
            'products' : self.products
             }

    @classmethod
    def find_by_favorite_id(cls, id):                           # Procurar favorito pelo id
        favorite = cls.favorites.find_one({'_id' : ObjectId(id)}) 
        if favorite:
             return FavoritesModel(favorite)
        else:
            return None

    @classmethod
    def find_by_client_id(cls, client_id):                           # Procurar favorito pelo id
        favorite = cls.favorites.find_one({'id_client' : client_id}) 
        if favorite:
             return FavoritesModel(favorite)
        else:
            return None

    def update(self):
        myquery = { "_id": ObjectId(self.id) }
        newvalues = { "$set": {
                            'date': self.date,
                            'id_client': self.id_client,
                            'products': self.products,
                             }}

        self.favorites.update(myquery, newvalues)

    def insert_to_db(self):  # inserting data
        self.favorites.insert({'date': self.date,
                            'id_client': self.id_client,
                            'products': self.products,
                            })

    def delete_from_db(self):
        self.favorites.delete_one({ "_id": ObjectId(self.id) })