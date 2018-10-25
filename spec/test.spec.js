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
  // afterEach(() => {
  //   return mongoose.disconnect();
  // });

  xdescribe("/topic", () => {
    it("should return status 200 and all topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics.length).to.equal(topicDocs.length);
          expect(res.body.topics[0]._id).to.eql(`${topicDocs[0]._id}`);
        });
    });

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
    it("should return status 201 and the posted article", () => {
      return request
        .post("/api/topics/cats/articles")
        .send({
          title: "new article",
          body: "This is my new article content",
          created_by: "5bd21b3d73718ddeca317afd",
          belongs_to: "cats"
        })
        .expect(201)
        .then(res => {
          expect(res.body.article).to.be.an("object");
          expect(res.body.article.created_by).to.equal(
            "5bd21b3d73718ddeca317afd"
          );
          expect(res.body.article).to.have.property("_id");
        });
    });
  });
  describe("/articles", () => {
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
        .get("/api/articles/5bd22357d473ddea59b0eea7")
        .expect(200)
        .then(res => {
          console.log(res.body);
          expect(res.body.article).to.be.an("array");
          // expect(res.body.articles.length).to.equal(articleDocs.length);
          // expect(res.body.articles[0]._id).to.eql(`${articleDocs[0]._id}`);
        });
    });
  });

  xdescribe("/comments", () => {
    it("should return status 200 and all topics", () => {
      return request
        .get("/api/comments")
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics.length).to.equal(topicDocs.length);
          expect(res.body.topics[0]._id).to.eql(`${topicDocs[0]._id}`);
        });
    });
  });

  xdescribe("/users", () => {
    it("should return status 200 and all topics", () => {
      return request
        .get("/api/users")
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics.length).to.equal(topicDocs.length);
          expect(res.body.topics[0]._id).to.eql(`${topicDocs[0]._id}`);
        });
    });
  });
});
