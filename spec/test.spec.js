process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const app = require("../app");
const request = require("supertest")(app);
const seedDB = require("../seed/seed");
const mongoose = require("mongoose");
const { topics, users, articles, comments } = require("../seed/testData/");

describe("/api", () => {
  let commentDocs, articleDocs, userDocs, topicDocs;
  beforeEach(() => {
    return seedDB(topics, users, articles, comments).then(dataDocs => {
      [commentDocs, articleDocs, userDocs, topicDocs] = dataDocs;
    });
  });
  after(() => {
    return mongoose.disconnect();
  });

  xdescribe("/topic", () => {
    it("should return status 200 and all topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics.length).to.equal(topicDocs.length);
          expect(res.body.topics[0]._id).to.eql(`${topicDocs[0]._id}`);
          //test that it have all keys
        });
    });
    it("should return status 404 and error message", () => {
      return request
        .get("/api/topcs")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("not found");
        });
    });
    topicDocs;
    it("should return status 200 and all articles by slug", () => {
      return request
        .get("/api/topics/cats/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles.length).to.equal(
            articleDocs.filter(a => a.belongs_to === "cats").length
          );
          expect(res.body.articles[0]._id).to.eql(
            `${articleDocs.filter(a => a.belongs_to === "cats")[0]._id}`
          );
        });
    });

    it("should return status 404 and and topic not found", () => {
      return request
        .get("/api/topics/cts/articles")
        .expect(404)
        .then(res => {
          expect(res.text).to.equal('{"msg":"Topic does not exist!"}');
        });
    });

    it("should return status 201 and the posted article", () => {
      return request
        .post(`/api/topics/${topicDocs[0].slug}/articles`)
        .send({
          title: "new article",
          body: "This is my new article content",
          created_by: userDocs[0]._id,
          belongs_to: topicDocs[0].slug
        })
        .expect(201)
        .then(res => {
          expect(res.body.article).to.be.an("object");
          expect(res.body.article.created_by).to.equal(String(userDocs[0]._id));
          expect(res.body.article).to.have.property("_id");
        });
    });
  });

  it("should return status 400 and bad request when posting invalid data", () => {
    return request
      .post("/api/topics/cats/articles")
      .send({
        tite: "new article",
        body: "This is my new article content",
        created_by: "5bd21b3d73718ddeca317afd",
        belongs_to: "cats"
      })
      .expect(400)
      .then(res => {});
  });
  xdescribe("/articles", () => {
    it("should return status 200 and all articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles.length).to.equal(articleDocs.length);
          expect(res.body.articles[0]._id).to.eql(`${articleDocs[0]._id}`);
        });
    });

    it("should return status 200 and an article", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.article).to.be.an("object");
          expect(res.body.article._id).to.equal(`${articleDocs[0]._id}`);
          expect(res.body.article.body).to.equal(`${articleDocs[0].body}`);
        });
    });

    it("should return status 200 and all an article votes incremented", () => {
      return request
        .patch(`/api/articles/${articleDocs[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body.article).to.be.an("object");
          expect(res.body.article.votes).to.equal(articleDocs[0].votes + 1);
          expect(res.body.article._id).to.equal(`${articleDocs[0]._id}`);
        });
    });

    it("should return status 200 and an article comments", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.comments).to.be.an("array");
          expect(res.body.comments.length).to.equal(
            commentDocs.filter(
              comment => comment.belongs_to + "" === articleDocs[0]._id + ""
            ).length
          );
          expect(res.body.comments[0].body).to.equal(
            commentDocs.filter(
              comment => comment.belongs_to + "" === articleDocs[0]._id + ""
            )[0].body
          );
        });
    });
  });

  xdescribe("/comments", () => {
    it("should return status 200 and an comment votes incremented", () => {
      return request
        .patch(`/api/comments/${commentDocs[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body.comment).to.be.an("object");
          expect(res.body.comment.votes).to.equal(commentDocs[0].votes + 1);
          expect(res.body.comment._id).to.equal(`${commentDocs[0]._id}`);
        });
    });
    it("should return status 200 and an comment deleted", () => {
      return request
        .delete(`/api/comments/${commentDocs[0]._id}`)
        .expect(204)
        .then(res => {
          console.log(res.statusMessage)
          expect(res.text).to.equal("deleted");
        });
    });
  });

  describe("/users", () => {
    it("should return status 200 and a user by his username", () => {
      console.log(userDocs[0].username);
      return request
        .get(`/api/users/${userDocs[0].username}`)
        .expect(200)
        .then(res => {
          expect(res.body.user).to.be.an("array");
          expect(res.body.user[0].username).to.eql(`${userDocs[0].username}`);
        });
    });
  });
});
