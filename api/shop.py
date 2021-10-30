# python packages
from flask_restful import Resource, request
from flask_jwt import jwt_required
from flask_jwt_extended import jwt_required
from flask import jsonify


from models.shop import ShopModel
from schemas.shop import shopschema


class Shop(Resource):

   # @jwt_required() 
    def get(self, shop_id):                                
        shop = ShopModel.find_by_shop_id(shop_id)
        if shop:
            return shopschema.dump(shop)
        return {'message': 'Shop not found'}, 404

    # @jwt_required() 
    def post(self):                    
        data = request.get_json(force=True)
        data['_id'] = 0
        shop = ShopModel(data)

        try:
            shop.insert_to_db()
        except:
            return {"message": "An error occurred inserting the order."}, 500

        return shop.json(), 201

    # @jwt_required() 
    def delete(self, shop_id):                            
        shop = ShopModel.find_by_shop_id(shop_id)
        if shop:
            shop.delete_from_db()

            return {'message': 'shop has been deleted'}

    # @jwt_required() 
    def put(self, shop_id):                                
     
        data = request.get_json(force=True)
        shop = ShopModel.find_by_shop_id(shop_id)

        if shop is None:
            shop = ShopModel(data['country_client'], data['date'], data['doc_invoice'],data['hour'],data['id_client'], data['id_producer'],
            data['locality_client'],data['name_client'],data['postal_code_client'],data['price'],data['quantity'],data['street_client',data['tax'],data['tin_client'],data['vat'],data['rate'],data['products']])
        else:
            shop.country_client = data['country_client']
            shop.date = data['date']
            shop.doc_invoice = data['doc_invoice']
            shop.hour = data['hour']
            shop.id_client = data['id_client']
            shop.id_producer = data['id_producer']
            shop.locality_client = data['locality_client']
            shop.name_client = data['name_client']
            shop.postal_code_client = data['postal_code_client']
            shop.price = data['price']
            shop.quantity = data['quantity']
            shop.street_client = data['street_client']
            shop.tax = data['tax']
            shop.tin_client = data['tin_client']
            shop.vat = data['vat']
            shop.rate = data ['rate']
            shop.products = data ['products']

        shop.update_to_db()

        return shopschema.dump(shop)

class ShopList(Resource):       

    # @jwt_required() 
    def get(self):
        return  ShopModel.find_all_shop()


class ShopDate(Resource):  

# @jwt_required() 
    def get(self, date):
        return {'shop': ShopModel.find_all_shop_by_date(date)} 

class ShopClient(Resource):    

# @jwt_required() 
    def get(self, id_client):                      
        return {'shops': ShopModel.find_all_shop_by_client(id_client)}

class ShopRate(Resource):
    def get (self, rate):
        return {'shops': ShopModel.find_all_shop_by_rate(rate)}
       
class ShopProducer(Resource):
    def get (self, id_producer):
        return {'shops': ShopModel.find_all_shop_by_id_producer(id_producer)}
