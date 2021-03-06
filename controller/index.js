const { User, Article, Comment, Topic } = require("../models/index");
const logger = require("../utils/logger");

function getComments(commentDocs, property, id) {
  return commentDocs.filter(doc => {
    return String(doc[property]) === String(id);
  }).length;
}

exports.getAllTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      logger.debug(`request: ${req.baseUrl}, response: ${topics}`);
      res.status(200).send({ topics });
    })
    .catch(next);
};
exports.getAllArticlesBySlug = (req, res, next) => {
  const slug = { slug: req.params.slug };
  Topic.find(slug)
    .then(data => {
      if (!data.length)
        return Promise.reject({ status: 404, msg: "Topic does not exist!" });
      Article.find({ belongs_to: data[0].slug })
        .populate("created_by")
        .lean()
        .then(articlesData => {
          return Promise.all([Comment.find(), articlesData]);
        })
        .then(([commentsDocs, articlesData]) => {
          const articles = articlesData.map(article => {
            const newArticle = {
              ...article,
              comment_count: getComments(
                commentsDocs,
                "belongs_to",
                article._id
              )
            };
            return newArticle;
          });
          logger.debug(
            `request: ${req.baseUrl} params: ${
              req.params.slug
            }, response: ${articles}`
          );
          res.send({ articles });
        });
    })
    .catch(next);
};
exports.postArticleBySlug = (req, res, next) => {
  Article.create(req.body)
    .then(article => {
      logger.debug(
        `request: ${req.baseUrl} params: ${
          req.params.slug
        }, response: ${article}`
      );
      res.status(201).send({ article });
    })
    .catch(next);
};

// articles route
exports.getAllArticles = (req, res, next) => {
  Article.find()
    .populate("created_by")
    .lean()
    .then(articlesData => {
      return Promise.all([Comment.find(), articlesData]);
    })
    .then(([commentsDocs, articlesData]) => {
      const articles = articlesData.map(article => {
        const newArticle = {
          ...article,
          comment_count: getComments(commentsDocs, "belongs_to", article._id)
        };
        return newArticle;
      });
      logger.debug(`request: ${req.baseUrl} response: ${articles}`);
      res.send({ articles });
    })
    .catch(next);
};
exports.getArticleById = (req, res, next) => {
  const id = req.params._id;
  Article.findById(id)
    .populate("created_by")
    .lean()
    .then(articleData => {
      return Promise.all([
        Comment.find({ belongs_to: articleData._id }),
        articleData
      ]).then(([comments, articleData]) => {
        const article = { ...articleData, comment_count: comments.length };
        logger.debug(
          `request: ${req.baseUrl}, params: ${
            req.params._id
          }, response: ${article}`
        );
        res.status(200).send({ article });
      });
    })
    .catch(next);
};
exports.getArticleByUserId = (req, res, next) => {
  Article.find({ created_by: req.params._id })
    .populate("created_by")
    .then(articles => {
      logger.debug(
        `request: ${req.baseUrl}, params: ${
          req.params._id
        }, response: ${articles}`
      );
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getCommentsByUserId = (req, res, next) => {
  Comment.find({ created_by: req.params._id })
    .populate("belongs_to")
    .populate("created_by")
    .then(comments => {
      logger.debug(
        `request: ${req.baseUrl}, params: ${
          req.params._id
        }, response: ${comments}`
      );
      res.status(200).send({ comments });
    })
    .catch(next);
};
exports.getCommentsByArticleId = (req, res, next) => {
  Comment.find({ belongs_to: req.params._id })
    .populate("belongs_to")
    .populate("created_by")
    .then(comments => {
      logger.debug(
        `request: ${req.baseUrl}, params: ${
          req.params._id
        }, response: ${comments}`
      );
      res.status(200).send({ comments });
    })
    .catch(next);
};

// comments route
exports.postCommentByArticle = (req, res, next) => {
  Comment.create(req.body)
    .then(comment => {
      logger.debug(
        `request: ${req.baseUrl}, params: ${
          req.params._id
        }, response: ${comment}`
      );
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchArticleVotes = (req, res, next) => {
  if (req.query.vote === "up") {
    Article.findOneAndUpdate(req.params, { $inc: { votes: 1 } }, { new: true })
      .populate("created_by")
      .then(article => {
        logger.debug(
          `request: ${req.baseUrl}, query: ${
            req.query.vote
          }, response: ${article}`
        );
        res.send({ article });
      })
      .catch(next);
  } else if (req.query.vote === "down") {
    Article.findOneAndUpdate(req.params, { $inc: { votes: -1 } }, { new: true })
      .populate("created_by")
      .then(newArticle => {
        logger.debug(
          `request: ${req.baseUrl}, query: ${
            req.query.vote
          }, response: ${article}`
        );
        res.send(newArticle);
      })
      .catch(next);
  } else if (req.query.vote !== "down" && req.query.vote !== "up") {
    next({ status: 404, msg: "Invalid query" });
  }
};

exports.deleteComment = (req, res, next) => {
  Comment.findByIdAndRemove(req.params._id)
    .then(doc => {
      res.status(204).send("Deleted");
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
      .populate("belongs_to")
      .populate("created_by")
      .then(comment => {
        logger.debug(
          `request: ${req.baseUrl}, query: ${
            req.query.vote
          }, response: ${comment}`
        );
        res.send({ comment });
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
      .populate("belongs_to")
      .populate("created_by")
      .then(comment => {
        logger.debug(
          `request: ${req.baseUrl}, query: ${
            req.query.vote
          }, response: ${comment}`
        );
        res.send({ comment });
      })
      .catch(next);
  } else if (req.query.vote !== "down" && req.query.vote !== "up") {
    next({ status: 404, msg: "Invalid query" });
  }
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then(users => res.status(200).send({ users }))
    .catch(next);
};
exports.getUsersByUsername = (req, res, next) => {
  User.find(req.params)
    .then(user => {
      if (user.length === 0)
        return Promise.reject({ status: 404, msg: "User does not exist!" });
      else res.status(200).send({ user });
    })
    .catch(next);
};

exports.changeLogLevel = (req, res, next) => {
  if (req.query.level === "debug") {
    process.env.logLevel === "debug";
    process.env.streamName === "minia-debugging";
    res.send("switched to debugging")

  } else if (req.query.level === "error") {
    process.env.logLevel === "error";
    process.env.streamName === "minia-errors";
    res.send("switched to error");
  }
};
