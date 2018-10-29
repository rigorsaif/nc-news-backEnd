## Northcoders news

This is a project to build a functional api for the news of Northcoders. the project in this phase just focuses on the back end development. making sure that the application is very functional and without any bugs.

### Getting Started

please refer to this link for the Routs of the application.

- [API Routers](https://quiet-thicket-37970.herokuapp.com/)

### Mongoose Documentation

The below are some of the model methods that you can call on your models.

- [find](http://mongoosejs.com/docs/api.html#model_Model.find)
- [findOne](http://mongoosejs.com/docs/api.html#model_Model.findOne)
- [findOneAndUpdate](http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate)
- [findOneAndRemove](http://mongoosejs.com/docs/api.html#model_Model.findOneAndRemove)
- [findById](http://mongoosejs.com/docs/api.html#model_Model.findById)
- [findByIdAndUpdate](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate)
- [findByIdAndRemove](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove)
- [update](http://mongoosejs.com/docs/api.html#model_Model.update)
- [create](https://mongoosejs.com/docs/api.html#model_Model.create)
- [remove](http://mongoosejs.com/docs/api.html#model_Model-remove)
- [save](http://mongoosejs.com/docs/api.html#model_Model-save)
- [count](http://mongoosejs.com/docs/api.html#model_Model.count)
- [populate](https://mongoosejs.com/docs/api.html#model_Model.populate)

### running the application

1 - You will need to install npm $ npm i.
2 - setting up the config file:
A - make a config file inside a config folder. make sure the config folder in the same directory as the app file.
B - set the variable environment. you can use process.env.NODE_ENV || "development".
C - your DB_URL should be different for both development and testing.
D - your DB_URL should take this format for your development "mongodb://localhost:27017/Database-name", and "mongodb://localhost:27017/nc_news_testing" for testing.

### the dependencies the app uses (use npm i to install them):

1 - mocha
2 - chai
3 - express
4 - body-parser
5 - supertest
6 - mongoose
7 - nodemon

3 - You would need to seed your database first by running $ npm run seed after running mongod.
4 - In case you would like to run the test you would need to run the command $ npm run test.

### this app is build with

- node.js
- express
- mongoose

### Authors

- Mahmoud Hosni

### Acknowledgments

- Mitch
- the coffee machine in the kitchen
- maybe Paul but not sure yet
