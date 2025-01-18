const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likesSum = (likesSum, blog) => likesSum + blog.likes;
  const totalBlogsLikes = blogs.reduce(likesSum, 0);
  return totalBlogsLikes;
};

const favoriteBlog = (blogs) => {
  const findFavoriteBlog = (favoriteBlog, blog) => {
    const hasBlogMoreLikes = blog.likes > favoriteBlog.likes;
    favoriteBlog = hasBlogMoreLikes ? blog : favoriteBlog;
    return favoriteBlog;
  };
  const blogWithMostLikes = blogs.reduce(findFavoriteBlog, blogs[0]);
  const { _id, __v, url, ...favoriteFiltered } = blogWithMostLikes;

  return favoriteFiltered;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
