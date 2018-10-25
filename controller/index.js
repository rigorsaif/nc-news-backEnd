const { User, Article, Comment, Topic } = require("../models/index");
exports.getAllTopics = (req, res, next) => {
  Topic.find()
    .then(topics => res.status(200).send({ topics }))
    .catch(next);
};
exports.getAllArticlesBySlug = (req, res, next) => {
  Topic.find(req.params)
    .then(data => {
      Article.find({ belongs_to: data[0].slug }).then(articles =>
        res.status(200).send(articles)
      );
    })
    .catch(next);
};
exports.postArticleBySlug = (req, res, next) => {
  Article.create(req.body)
    .then(newArticle => {
      res.status(201).send(newArticle);
    })
    .catch(next);
};

// articles route
exports.getAllArticles = (req, res, next) => {
  Article.find()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(next);
};
exports.getArticleById = (req, res, next) => {
  Article.find(req.params)
    .then(article => res.status(200).send(article))
    .catch(next);
};
exports.getCommentsByArticleId = (req, res, next) => {
  Comment.find({ belongs_to: req.params._id })
    .populate("belongs_to")
    .populate("created_by")
    .then(comments => {
      res.status(200).send(comments);
    })
    .catch(next);
};

// comments route
exports.postCommentByArticle = (req, res, next) => {
  Comment.create(req.body)
    .then(newComment => {
      res.status(201).send(newComment);
    })
    .catch(next);
};

exports.patchArticleVotes = (req, res, next) => {
  if (req.query.vote === "up") {
    Article.findOneAndUpdate(req.params, {
      $inc: { votes: 1 }
    })
      .then(newArticle => {
        res.send(newArticle);
      })
      .catch(next);
  } else if (req.query.vote === "down") {
    Article.findOneAndUpdate(req.params, {
      $inc: { votes: -1 }
    })
      .then(newArticle => {
        res.send(newArticle);
      })
      .catch(next);
  }
};

exports.deleteComment = (req, res, next) => {
  Comment.findByIdAndRemove(req.params._id)
    .then(doc => {
      res.send("deleted");
    })
    .catch(next);
};

exports.voteUpComments = (req, res, next) => {
  if (req.query.vote === "up") {
    Comment.findOneAndUpdate(
      req.params,
      {
        $inc: { votes: 1 }
      },
      { new: true }
    )
      .then(newArticle => {
        res.send(newArticle);
      })
      .catch(next);
  } else if (req.query.vote === "down") {
    Comment.findOneAndUpdate(
      req.params,
      {
        $inc: { votes: -1 }
      },
      { new: true }
    )
      .then(newArticle => {
        res.send(newArticle);
      })
      .catch(next);
  }
};

exports.getUsersByUsername = (req, res, next) => {
  User.find(req.params)
    .then(user => res.status(200).send(user))
    .catch(next);
};
