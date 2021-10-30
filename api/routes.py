from api.fileupload import File, FileUpload
from api.clients import ClientList, ClientRegister, Client
from api.authentication import Auth
from api.products import Products,ProductsCategory, ProductsCategoryProducer,ProductsList,ProductsType,ProductsProducer,ProductsTypeProducer
from api.carts import Carts , CartClient
from api.favorites import Favorites
from api.admin import AdminRegister, Admin
from api.producer import ProducerRegister, Producer, ProducerList
from api.shop import Shop, ShopList, ShopDate,ShopClient, ShopRate, ShopProducer
""" from api.reset_password import ForgotPassword, ResetPassword """

def create_routes(api):
    api.add_resource(Client, '/client/<string:client_id>', '/client')
    api.add_resource(ClientRegister, '/register')
    api.add_resource(ClientList, '/clients')
    api.add_resource(Auth, '/auth')
    api.add_resource(Products,'/products/<string:product_id>', '/products')
    api.add_resource(ProductsList, '/productslist')
    api.add_resource(ProductsType,'/products/type/<string:type>')
    api.add_resource(ProductsCategory,'/products/category/<string:category>')
    api.add_resource(Carts,'/carts/<string:carts_id>' , '/carts' )
    api.add_resource(ProductsProducer,'/products/producer/<string:id_producer>')
    api.add_resource(ProductsCategoryProducer,'/products/<string:id_producer>/<string:category>' )
    api.add_resource(ProductsTypeProducer,'/products/<string:id_producer>/Category/<string:type>' )
    api.add_resource(Favorites,'/favorites/<string:id_client>' , '/favorites' )
    api.add_resource(Admin, '/admin')
    api.add_resource(Producer, '/producer', '/producer/<string:producer_id>')
    api.add_resource(AdminRegister, '/adminregister')
    api.add_resource(ProducerRegister, '/producerregister')
    api.add_resource(ProducerList, '/producers')
    api.add_resource(Shop, '/shop/<string:shop_id>', '/shop')
    api.add_resource(ShopList, '/shoplist')
    api.add_resource(ShopDate, '/shop/date/<string:date>')
    api.add_resource(ShopRate, '/shop/rate/<string:rate>')
    api.add_resource(ShopClient, '/shop/client/<string:id_client>')
    api.add_resource(ShopProducer, '/shop/producer/<string:id_producer>')
    api.add_resource(FileUpload,'/upload')
    api.add_resource(File,'/<string:Files>/<string:destination>')
    api.add_resource(CartClient,'/cart/client/<string:id_client>')
    """ api.add_resource(ForgotPassword,'/forgot')
    api.add_resource(ResetPassword,'/reset') """