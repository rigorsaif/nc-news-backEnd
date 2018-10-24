const mongoose = require("mongoose");
const { User, Article, Comment, Topic } = require("../models/index");
const { getArticlesData, getCommentsData } = require("../utils/index");
const seedDB = (topicsData, usersData, articleData, commentData) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topic.insertMany(topicsData),
        User.insertMany(usersData)
      ]);
    })
    .then(([topics, users]) => {
      return Promise.all([
        Article.insertMany(getArticlesData(users, articleData)),
        users
      ]);
    })
    .then(([articleData, users]) => {
      return Comment.insertMany(
        getCommentsData(articleData, users, commentData)
      );
    });
};

module.exports = seedDB;
