const { User, Article, Comment, Topic } = require("../models/index");
exports.getAllTopics = (req, res, next) => {
  Topic.find()
    .then(allTopics => res.send(allTopics))
    .catch(next);
};

exports.getAllTheArticlesBySlug = (req, res, next) => {};
