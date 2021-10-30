from marshmallow import Schema, fields, post_load

class AdminSchema(Schema):
    _id = fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True)
    name = fields.Str(required=True)
    telephone = fields.Str(required=True)

'''     @post_load
    def make_admin(self, data, **kwargs):
        return Admin(**data) '''