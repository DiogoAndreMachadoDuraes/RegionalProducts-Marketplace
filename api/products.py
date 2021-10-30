# python packages
from flask_restful import Resource, request
from flask_jwt import jwt_required
from flask_jwt_extended import jwt_required
from flask import jsonify
# local packages
from models.products import ProductsModel

class Products(Resource):

    #@jwt_required() 
    def get(self, product_id):                                 # Retorna um produto se encontrar pelo id desse produto
        product = ProductsModel.find_by_product_id(product_id)
        if product:
            return jsonify({'products' : product.json()})
        return {'message': 'Product not found'}, 404

    @jwt_required() 
    def post(self):                            # Insere um novo produto na bd
        data = request.get_json(force=True)
        data['_id'] = 0
        products = ProductsModel(data)

        try:
            products.insert_to_db()
        except:
            return {"message": "An error occurred inserting the order."}, 500

        return products.json(), 201

    @jwt_required() 
    def delete(self, product_id):                            # Apaga um produto sendo passado o id
        product = ProductsModel.find_by_product_id(product_id)
        if product:
            product.delete_from_db()

            return {'message': 'product has been deleted'}

    @jwt_required() 
    def put(self, product_id):                                # Atualiza um produto sendo passado o id
        # Create or Update 
        data = request.get_json(force=True)
        product = ProductsModel.find_by_product_id(product_id)

        if product is None:
            product = ProductsModel(data['name'],data['type'], data['quantity'], data['validity'],
                            data['harvest'], data['category'],data['acidity'], data['alcohol_content'],data['price'],data['photo'],data['stock'],data['id_producer'],data['logo_producer'],data['name_producer'])
        else:
            product.name = data['name']
            product.type = data['type']
            product.quantity = data['quantity']
            product.validity = data['validity']
            product.harvest = data['harvest']
            product.category = data['category']
            product.alcohol_content = data['alcohol_content']
            product.acidity = data['acidity']
            product.price = data['price']
            product.photo = data['photo']
            product.stock = data['stock']
            product.id_producer= data['id_producer']
            product.logo_producer = data['logo_producer']
            product.name_producer = data['name_producer']

        product.update_to_db()

        return product.json()

class ProductsList(Resource):       # Classe para definir get em relacao a uma lista de produtos

    #@jwt_required() 
    def get(self):
        return  ProductsModel.find_all_products()


class ProductsCategory(Resource):   # Classe para definir get para filtar por categoria

    #@jwt_required() 
    def get(self, category):
        return {'products': ProductsModel.find_all_products_by_category(category)} 

class ProductsType(Resource):    # Classe para definir get para filtar por tipo

    #@jwt_required() 
    def get(self, type):
        return {'products': ProductsModel.find_all_products_by_type(type)}  


class ProductsProducer(Resource):    # Classe para definir get para filtar por produtor

    #@jwt_required() 
    def get(self, id_producer):
        return {'products': ProductsModel.find_all_products_by_producer(id_producer)}

class ProductsCategoryProducer(Resource):    # Classe para definir get para filtar por produtor e categoria

    #@jwt_required() 
    def get(self, id_producer,category):
        return {'products': ProductsModel.find_all_products_by_producer_and_category(id_producer,category)} 

class ProductsTypeProducer(Resource):    # Classe para definir get para filtar por produtor e tipo

    #@jwt_required() 
    def get(self, id_producer,type):
        return {'products': ProductsModel.find_all_products_by_producer_and_type(id_producer,type)} 