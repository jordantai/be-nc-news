const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");

describe("formatDates", () => {
  test("returns a new empty array of empty objects, when passed an empty array of empty objects", () => {
    const input = [{}];
    expect(formatDates(input)).toEqual([{}]);
  });
  test("returned array has different reference to original array", () => {
    const input = [{}];
    expect(formatDates(input)).not.toBe(input);
  });
  test("objects in array have a different reference to original objects", () => {
    const input = [{}];
    expect(formatDates(input)[0]).not.toBe(input[0]);
  });
  test("takes a UNIX timepstamp and returns a formatted  timestamp", () => {
    const input = [{ created_at: 1471522072389 }];
    const timestamp = new Date(input[0]["created_at"]);
    const formattedTimestamp = timestamp.toLocaleString("en-GB", {
      hour12: false,
    });
    expect(formatDates(input)).toEqual([{ created_at: formattedTimestamp }]);
  });
  test("takes an array with multiple objects and only formats the object with a timestamp, the rest of the objects are left the same", () => {
    const input = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    const timestamp = new Date(input[0]["created_at"]);
    const formattedTimestamp = timestamp.toLocaleString("en-GB", {
      hour12: false,
    });
    expect(formatDates(input)).toEqual([
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: formattedTimestamp,
        votes: 100,
      },
    ]);
  });
  test("does not mutate original aray", () => {
    const input = [{ created_at: 1471522072389 }];
    formatDates(input);
    expect(input[0]).toEqual({ created_at: 1471522072389 });
  });
});

describe("makeRefObj", () => {
  test("returns an empty object, when passed an empty array", () => {
    const input = [];
    const actual = makeRefObj(input);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  test("returned object has different reference to input", () => {
    const input = [{}];
    // this is checking the return value has a different reference to the input
    expect(makeRefObj(input)).not.toBe(input);
    // this check the input was not affected by the function and still looks the same
    expect(makeRefObj(input)).toEqual({});
  });
  test("takes an array of article objects and returns a reference object with the key as 'title' and value as the 'article_id'", () => {
    const input = [
      [
        {
          article_id: 1,
          title: "Living in the shadow of a great man",
        },
      ],
      "title",
      "article_id",
    ];
    expect(makeRefObj(...input)).toEqual({
      "Living in the shadow of a great man": 1,
    });
  });
  test("works for multiple objects in array", () => {
    const input = [
      [
        {
          article_id: 1,
          title: "Living in the shadow of a great man",
        },
        {
          article_id: 2,
          title: "Eight pug gifs that remind me of mitch",
        },
      ],
      "title",
      "article_id",
    ];
    expect(makeRefObj(...input)).toEqual({
      "Living in the shadow of a great man": 1,
      "Eight pug gifs that remind me of mitch": 2,
    });
  });
  test("does not mutate original array", () => {
    const input = [
      [
        {
          article_id: 1,
          title: "Living in the shadow of a great man",
        },
      ],
      "title",
      "article_id",
    ];
    makeRefObj(...input);
    expect(input[0]).toEqual([
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
      },
    ]);
  });
});

describe("formatComments", () => {});
