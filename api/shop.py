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
            shop = ShopModel(data['country_client'], data['address_client'], data['date'], data['pdf_invoice'],data['hour'],data['id_client'], data['telephone_client'], data['id_product'],
            data['location_client'],data['name_product'],data['postal_code'],data['price_final'],data['quantity_final'],data['photo_product'],data['tax'],data['tin_client'],data['vat'],data['avaliantion'],data['email_client'])
        else:
            shop.country_client = data['country_client']
            shop.address_client = data['address_client']
            shop.date = data['date']
            shop.pdf_invoice = data['pdf_invoice']
            shop.hour = data['hour']
            shop.id_client = data['id_client']
            shop.telephone_client = data['telephone_client']
            shop.id_product = data['id_product']
            shop.location_client = data['location_client']
            shop.name_product = data['name_product']
            shop.postal_code = data['postal_code']
            shop.price_final = data['price_final']
            shop.quantity_final = data['quantity_final']
            shop.photo_product = data['photo_product']
            shop.tax = data['tax']
            shop.tin_client = data['tin_client']
            shop.vat = data['vat']
            shop.avaliation = data ['avaliation']
            shop.email_client = data ['email_client']

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
    def get (self, avaliation):
        return {'shops': ShopModel.find_all_shop_by_rate(avaliation)}
       
class ShopProducer(Resource):
    def get (self, id_product):
        return {'shops': ShopModel.find_all_shop_by_id_producer(id_product)}
