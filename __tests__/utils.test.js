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
    expect(formatDates(input)).toEqual([{ created_at: timestamp }]);
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
    expect(formatDates(input)).toEqual([
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: timestamp,
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

describe("formatComments", () => {
  test("returns a new empty array, when passed an empty array", () => {
    const comments = [];
    const articleLookup = {};
    const actual = formatComments(comments, articleLookup);
    const expected = [];
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(comments);
  });
  test("returned array has different reference to original array", () => {
    const input = [{}];
    expect(formatComments(input)).not.toBe(input);
  });
  test("objects in array have different reference to original objects", () => {
    const input = [{}];
    expect(formatComments(input)[0]).not.toBe(input[0]);
  });
  test("takes a comment object and a reference object and replaces the belongs_to key and value with article_id ", () => {
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ];
    const articleRef = {
      "They're not exactly dogs, are they?": 1,
    };
    const keyToChange = "belongs_to";
    const keyToCreate = "article_id";
    expect(
      formatComments(comments, articleRef, keyToChange, keyToCreate)
    ).toEqual([
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 1,
        author: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ]);
  });
  test("works for mulitple objects in array", () => {
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: -100,
        created_at: 1416746163389,
      },
    ];
    const articleRef = {
      "They're not exactly dogs, are they?": 1,
      "Living in the shadow of a great man": 2,
    };
    const keyToChange = "belongs_to";
    const keyToCreate = "article_id";
    expect(
      formatComments(comments, articleRef, keyToChange, keyToCreate)
    ).toEqual([
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 1,
        author: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        article_id: 2,
        author: "icellusedkars",
        votes: -100,
        created_at: 1416746163389,
      },
    ]);
  });
  test("converts the created_at UNIX timestamp into a JS date object using formatDates function", () => {
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 1,
        author: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ];
    const timestamp = new Date(comments[0]["created_at"]);
    expect(formatDates(comments)).toEqual([
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 1,
        author: "butter_bridge",
        votes: 16,
        created_at: timestamp,
      },
    ]);
  });
});
