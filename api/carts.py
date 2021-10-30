# python packages
from flask_restful import Resource, request
from flask_jwt import JWT
from bson import ObjectId
from flask_jwt_extended import jwt_required
# local packages
from schemas.cart import CartSchema, cartsschema
from models.carts import CartsModel

class Carts(Resource):

 

    @jwt_required() #insere um carrinho na bd
    def post(self):
        data = request.get_json(force=True)
        data['_id'] = 0
        cart = CartsModel(data)

        try:
            cart.insert()
        except:
            return {"message": "An error occurred inserting the order."}, 500

        return cart.json(), 201   

    @jwt_required() #apaga um carrinho da bd
    def delete(self, carts_id):                            # Apaga um cart sendo passado o id
        cart = CartsModel.find_by_cart_id(carts_id)
        if cart:
            cart.delete_from_db()

            return {'message': 'cart has been deleted'}

    @jwt_required()
    def put(self, carts_id):                                # Atualiza um cart sendo passado o id
        # Create or Update 
        data = request.get_json(force=True)
        cart = CartsModel.find_by_cart_id(carts_id)

        if cart is None:
            cart = CartsModel(data['id_client'], data['email_client'], data['products']) 
        else:
            cart.id_client = data['id_client']
            cart.email_client = data['email_client']
            cart.products = data['products']
         
        cart.update()

        return cartsschema.dump(cart)




    @jwt_required() 
    def get(self,carts_id):                                 
       cart = CartsModel.find_by_cart_id(carts_id)
       if cart:
            return cartsschema.dump(cart)
       return {'message': 'Cart not found'}, 404


class CartClient(Resource):    


    @jwt_required() 
    def get(self, id_client):                                 
       cart = CartsModel.find_all_cart_by_client( id_client)
       if cart:
            return cartsschema.dump(cart)
       return {'message': 'Cart not found'}, 404


    @jwt_required()
    def put(self, id_client):                                # Atualiza um cart pelo id do client
        # Create or Update 
        data = request.get_json(force=True)
        cart = CartsModel.find_all_cart_by_client(id_client)

        if cart is None:
            cart = CartsModel(data['products'],data['id_client'])
        else:
            cart.id_client = data['id_client']
            cart.products = data['products']
         
        cart.update()

        return cartsschema.dump(cart)


    @jwt_required() #apaga um carrinho da bd 
    def delete(self, id_client):                            # Apaga um cart sendo passado o id do client
        cart = CartsModel.find_all_cart_by_client(id_client)
        if cart:
            cart.delete_from_db()

            return {'message': 'cart has been deleted'}
   
