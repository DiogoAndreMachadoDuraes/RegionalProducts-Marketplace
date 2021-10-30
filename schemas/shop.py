from marshmallow import Schema, fields, post_load

class ProductsSchema(Schema):
    id_product =  fields.Str(required=True)
    name_product =  fields.Str(required=True)
    photo_product =  fields.Str(required=True)
    
class ShopSchema(Schema):
    _id = fields.Str(required=True)
    date = fields.Str(required=True)
    hour = fields.Str(required=True)
    id_client = fields.Str(required=True)
    id_producer = fields.Str(requierd=True)
    doc_invoice = fields.Str(required=True)
    price = fields.Str(required=True)
    country_client = fields.Str(required=True)
    postal_code_client = fields.Str(required=True)
    locality_client = fields.Str(required=True)
    name_client = fields.Str(required=True)
    street_client = fields.Str(required=True)
    tax = fields.Str(required=True)
    vat = fields.Str(required=True)
    rate = fields.Str(requierd=True)
    products = fields.List(fields.Nested(ProductsSchema))

shopschema = ShopSchema()
