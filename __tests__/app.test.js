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
    test("not allowed methods", () => {
      const invalidMethods = ["delete"];
      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]("/api")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("Method not allowed");
          });
      });
      return Promise.all(requests);
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
        test("status: 200 - responds with a user object", () => {
          return request(app)
            .get("/api/users/lurker")
            .expect(200)
            .then(({ body }) => {
              expect(typeof body.user).toBe("object");
              expect(body.user.username).toBe("lurker");
            });
        });
        test("status: 200 - the user object has all the keys from users table", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(({ body }) => {
              expect(Object.keys(body.user)).toEqual(
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
              [method]("/api/users/butter_bridge")
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
              expect(typeof body.article).toBe("object");
              expect(body.article.article_id).toBe(1);
            });
        });
        test("status: 200 - the articles object has all the column names as keys from the articles table and also a comment_count key", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(Object.keys(body.article)).toEqual(
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
        test("status: 404 - non-existent article_id", () => {
          return request(app)
            .patch("/api/articles/10000")
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe("Article not found");
            });
        });
        test("status: 400 - article_id is a non integer", () => {
          return request(app)
            .patch("/api/articles/nonInt")
            .send({ inc_votes: 1 })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("Bad request");
            });
        });
        test("status: 400 - votes increment value is a non integer", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: "nonInt" })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("Bad request");
            });
        });
        test("status: 400 - votes increment is missing", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({})
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("Bad request");
            });
        });
      });
      describe("INVALID METHODS", () => {
        test("not allowed methods", () => {
          const invalidMethods = ["post", "put", "delete"];
          const requests = invalidMethods.map((method) => {
            return request(app)
              [method]("/api/articles/1")
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).toBe("Method not allowed");
              });
          });
          return Promise.all(requests);
        });
      });
      describe("articles/:article_id/comments", () => {
        describe("POST", () => {
          test("status: 201 - adds a comment object for a specific article_id", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "lurker", body: "Awesome it is" })
              .expect(201)
              .then(({ body }) => {
                expect(Object.keys(body.comment[0])).toEqual(
                  expect.arrayContaining([
                    "article_id",
                    "title",
                    "body",
                    "votes",
                    "author",
                    "created_at",
                  ])
                );
                expect(body.comment.body).toBe("Awesome it is");
              });
          });
        });
        describe("GET", () => {
          test("status: 200 - responds with an array of comments objects for the given article_id", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(Array.isArray(body.comments)).toBe(true);
                expect(body.comments.length).toBe(13);
              });
          });
        });
      });
    });
  });
});
