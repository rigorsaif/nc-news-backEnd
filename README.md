## Northcoders news

This is a project to build a functional api for the news of Northcoders. the project in this phase just focuses on the back end development. making sure that the application is very functional and without any bugs.

### Getting Started

please refer to this link for the Routs of the application.
- [Postman Documentation for this API](https://documenter.getpostman.com/view/6469751/RztfxCoZ)
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

1 - You will need to install the dependencies $ npm i.

#### setting up the config file for database:
A - make a config file inside a config folder. make sure the config folder in the same directory as the app file.
B - set the variable environment. you can use process.env.NODE_ENV || "development".
C - your DB_URL should be different for both development and testing.
D - your DB_URL should take this format for your development "mongodb://localhost:27017/Database-name", and "mongodb://localhost:27017/Database_Name_testing" for testing.

#### setting up the config file for logs with cloudWatch:
A - make a cloudWatchConfig file inside a config folder.<br />
B - creat an object with cloudWatch keys. it should contain 
{accessKeyID,
  secretAccessKey,
  logLevel: "your log level here",
  streamName: "your log streamName here",
  groupName: "your log group",
  region: "cloudwatch region"}.<br />
C- export the object.<br />

2 - You would need to seed your database first by running $ npm run seed after running mongod.<br />
3 - In case you would like to run the test you would need to run the command $ npm run test.<br />

### the dependencies the app uses (use npm i to install them):

1 - mocha <br />
2 - chai <br />
3 - express <br />
4 - body-parser <br />
5 - supertest <br />
6 - mongoose <br />
7 - nodemon <br />
8 - winston <br />
9 - winston-aws-cloudwatch <br />

### this app is build with

- node.js <br />
- express <br />
- mongoose <br />

## Authors

- Mahmoud Hosni
