const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const blogApiHelper = require("./blog_api_helper");
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogApiHelper.initialBlogs);
});

describe("blogs test", () => {
  test("same amount of blogs as initial list", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, blogApiHelper.initialBlogs.length);
  });

  test("blog was id property", async () => {
    const response = await api.get("/api/blogs");
    const blog = response.body[0];
    assert.strictEqual(Object.hasOwn(blog, "id"), true);
  });

  test("valid blog can be added", async () => {
    const newBlog = {
      title: "China",
      author: "Rodrigo Business",
      url: "https://google.com/",
      likes: 5,
    };

    const saveBlogResponse = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const { id, ...savedBlogWioutId } = saveBlogResponse.body;

    assert.deepStrictEqual(savedBlogWioutId, newBlog);

    const listPostResponse = await api.get("/api/blogs");

    assert.strictEqual(
      listPostResponse.body.length,
      blogApiHelper.initialBlogs.length + 1
    );
  });

  test("default value for likes is 0", async () => {
    const newBlog = {
      title: "Japan",
      author: "Oscar Winds",
      url: "https://kamaleont.io/",
    };

    const saveBlogResponse = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(saveBlogResponse.body.likes, 0);
  });

  test("blog not save if missing title or url", async () => {
    const newBlogWithoutTitle = {
      author: "Pacita Blue",
      url: "https://traslacion.cl/",
    };

    const newBlogWithoutUrl = {
      title: "Patagonia",
      author: "Oscar Winds",
    };

    await api.post("/api/blogs").send(newBlogWithoutTitle).expect(400);
    await api.post("/api/blogs").send(newBlogWithoutUrl).expect(400);
  });

  test("a blog can be deleted", async () => {
    const blogsAtStart = await blogApiHelper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await blogApiHelper.blogsInDb();
    const blogIds = blogsAtEnd.map((blog) => blog.id);

    assert(!blogIds.includes(blogToDelete.id));
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
  });

  test("blog likes can be updated", async () => {
    const blogsAtStart = await blogApiHelper.blogsInDb();
    let blogToUpdate = blogsAtStart[0];
    blogToUpdate.likes = 0;

    const updatedBlogResponse = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    assert.strictEqual(updatedBlogResponse.body.likes, 0);
  });
});

after(async () => {
  await mongoose.connection.close();
});
