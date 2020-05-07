process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe("app", () => {
  describe("/api", () => {
    test("status: 404 - missing route", () => {
      return request(app)
        .get("/api/doesnotexist")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Resource not found");
        });
    });
    describe("/topics", () => {
      describe("GET", () => {
        test("status: 200 - responds with array of topic objects", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              expect(Array.isArray(body.topics)).toBe(true);
              expect(body.topics.length).toBe(3);
            });
        });
        test("status: 200 - each topic has keys from topics table", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              body.topics.forEach((topic) => {
                expect(Object.keys(topic)).toEqual(
                  expect.arrayContaining(["description", "slug"])
                );
              });
            });
        });
        test("status: 200 - topics come back in default ordering alphanbetically by slug", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              expect(body.topics).toBeSortedBy("slug");
            });
        });
      });
      describe("INVALID METHODS", () => {
        test("not allowed methods", () => {
          const invalidMethods = ["patch", "post", "delete"];
          const requests = invalidMethods.map((method) => {
            return request(app)
              [method]("/api/topics")
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).toBe("Method not allowed");
              });
          });
          return Promise.all(requests);
        });
      });
    });
    describe("/users/:username", () => {
      describe("GET", () => {
        test("status: 200 - responds with array of a user object", () => {
          return request(app)
            .get("/api/users/lurker")
            .expect(200)
            .then(({ body }) => {
              expect(Array.isArray(body.user)).toBe(true);
              expect(body.user.length).toBe(1);
            });
        });
        test("status: 200 - the user object has all the keys from users table", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(({ body }) => {
              expect(Object.keys(body.user[0])).toEqual(
                expect.arrayContaining(["username", "avatar_url", "name"])
              );
            });
        });
        test("status: 404 - for non existent username", () => {
          return request(app)
            .get("/api/users/non-existent-user")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("User not found");
            });
        });
      });
      describe("INVALID METHODS", () => {
        test("not allowed methods", () => {
          const invalidMethods = ["patch", "post", "put", "delete"];
          const requests = invalidMethods.map((method) => {
            return request(app)
              [method]("/api/users")
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).toBe("Method not allowed");
              });
          });
          return Promise.all(requests);
        });
      });
    });
    describe("/articles/:article_id", () => {
      describe("GET", () => {
        test("status: 200 - responds with article object based on certain id", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(Array.isArray(body.article)).toBe(true);
              expect(body.article.length).toBe(1);
            });
        });
        test("status: 200 - the articles object has all the column names as keys from the articles table and also a comment_count key", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(Object.keys(body.article[0])).toEqual(
                expect.arrayContaining([
                  "article_id",
                  "title",
                  "body",
                  "votes",
                  "topic",
                  "author",
                  "created_at",
                  "comment_count",
                ])
              );
            });
        });
        test("status: 404 - for non existent article_id", () => {
          return request(app)
            .get("/api/articles/1000")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Article not found");
            });
        });
        test("status: 400 - invalid article_id", () => {
          return request(app)
            .get("/api/articles/notAnInt")
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Bad request");
            });
        });
      });
      describe("PATCH", () => {
        test("status: 200 - updates number of votes", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then(({ body }) => {
              expect(body.article.votes).toBe(101);
            });
        });
      });
    });
  });
});
