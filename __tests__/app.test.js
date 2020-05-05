process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe("app", () => {
  describe("/api", () => {
    describe("/topics", () => {
      describe("GET", () => {
        test("status: 200 responds with array of topic objects", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              expect(Array.isArray(body.topics)).toBe(true);
              expect(body.topics.length).toBe(3);
            });
        });
        test("status 200: each topic has keys from topics table", () => {
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
      });
    });
  });
});
