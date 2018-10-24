const seedDB = require("./seed");
const mongoose = require("mongoose");
const { DB_URL } = require("../config/config");
const { topics, users, articles, comments } = require("../seed/devData");
mongoose
  .connect(DB_URL)
  .then(() => {
    return seedDB(topics, users, articles, comments);
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(console.log);
