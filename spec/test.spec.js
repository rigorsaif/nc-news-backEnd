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
  afterEach(() => {
    return mongoose.disconnect();
  });

  describe("/topic", () => {
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
  });
  xdescribe("/articles", () => {
    it("should return status 200 and all topics", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics.length).to.equal(topicDocs.length);
          expect(res.body.topics[0]._id).to.eql(`${topicDocs[0]._id}`);
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
