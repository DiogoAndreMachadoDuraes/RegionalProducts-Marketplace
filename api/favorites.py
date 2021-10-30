# python packages
from flask_restful import Resource, request
from flask_jwt import jwt_required
from flask_jwt_extended import jwt_required
from flask import jsonify
# local packages
from models.favorites import FavoritesModel
from schemas.favorite import favoriteschema

class Favorites(Resource):

    @jwt_required() 
    def get(self, id_client):                                 # Retorna um favorito se encontrar pelo id do cliente
        favorite = FavoritesModel.find_by_client_id(id_client)
        if favorite:
            return favoriteschema.dump(favorite)
        return {'message': 'Favorite not found'}, 404

    @jwt_required() 
    def put(self, id_client):                                # Atualiza um favorito sendo passado o id
        # Create or Update 
        data = request.get_json(force=True)
        favorite = FavoritesModel.find_by_client_id(id_client)

        if favorite is None:
            favorite = FavoritesModel(data['id_client'],data['date'], data['products']) #Isto não funciona
        else:
            favorite.id_client = data['id_client']
            favorite.date = data['date']
            favorite.products = data['products']
         
        favorite.update()

        return favoriteschema.dump(favorite)

    @jwt_required() 
    def post(self):                            # Insere um novo favorito
        data = request.get_json(force=True)
        data['_id'] = 0
        favorites = FavoritesModel(data)

        try:
            favorites.insert_to_db()
        except:
            return {"message": "An error occurred inserting the order."}, 500

        return favorites.json(), 201

    @jwt_required() 
    def delete(self, id_client):                            # Apaga um favorito sendo passado o id
        favorite = FavoritesModel.find_by_client_id(id_client)
        if favorite:
            favorite.delete_from_db()

            return {'message': 'favorite has been deleted'}