from marshmallow import Schema, fields, post_load

class ClientSchema(Schema):
    _id = fields.Str(required=True)
    tin = fields.Int(required=True)
    name = fields.Str(required=True)
    birthday = fields.Str(required=True)
    telephone = fields.Str(required=True)
    street = fields.Str(required=True)
    locality = fields.Str(required=True)
    country = fields.Str(required=True)
    postal_code = fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True)
    state = fields.Str(required=True)

'''     @post_load
    def make_client(self, data, **kwargs):
        return Client(**data) '''