const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");

const blogApiHelper = require("./blog_api_helper");
const initialBlogs = blogApiHelper.initialBlogs;

const listHelper = require("./list_helper");

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const listWithOneBlog = [initialBlogs[0]];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 7);
  });

  test("find favorite blog on array of blogs", () => {
    const favoriteBlogResult = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    const result = listHelper.favoriteBlog(initialBlogs);
    assert.deepStrictEqual(result, favoriteBlogResult);
  });
});
