from marshmallow import Schema, fields, post_load

class ProductsSchema(Schema):
    id_product =  fields.Str(required=True)
    name_product =  fields.Str(required=True)
    photo_product =  fields.Str(required=True)
    price_product =  fields.Str(required=True)
    quantity_product = fields.Str(required=True) 

class CartSchema(Schema):
    _id = fields.Str(required=True)
    id_client = fields.Str(required=True)
    email_client= fields.Str(required=True)
    products = fields.List(fields.Nested(ProductsSchema))
    
   

cartsschema = CartSchema()
