mongodb = {'host': 'cluster0.qmppi.mongodb.net/RegionalProducts',
         'user': 'andreiadiogo',
         'password': 'andreiadiogo'}

mongodbConfig = "mongodb+srv://{}:{}@{}?retryWrites=true&w=majority".format(mongodb['user'] ,mongodb['password'], mongodb['host'])