mongodb = {'host': 'cluster0.saroy.mongodb.net/wineolive',
         'user': 'atlas',
         'password': 'cee95DZXYuNNqneO'}

mongodbConfig = "mongodb+srv://{}:{}@{}?retryWrites=true&w=majority".format(mongodb['user'] ,mongodb['password'], mongodb['host'])