const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const counter = (a, b) => {
        return a = a + b.likes;
    };

    return blogs.length === 0
            ? 0
            : blogs.reduce(counter, 0);
}

const favouriteBlog = (blogs) => {
    let fav = blogs[0];
    blogs.forEach((blog) => {
        if (fav.likes < blog.likes) {
            fav = blog;
        }
    });

    return {
        title: fav.title,
        author: fav.author,
        likes: fav.likes
    };
}

const mostBlogs = (blogs) => {
    const newblogs = _.countBy(blogs, (blog) => blog.author);
    const pairedBlogs = _.toPairsIn(newblogs).map((blog) => ({author: blog[0], blogs: blog[1]}));
    const sortedBlogs = _.sortBy(pairedBlogs, (blog) => blog.blogs)
    const mostBlogger = _.findLast(sortedBlogs);
    return mostBlogger;
}

const mostLikes = (blogs) => {
    const newBlogs = _.map(blogs, ({author, likes}) => ({author, likes}))
    const groupedBlogs = _.groupBy(newBlogs, (blog) => blog.author)
    const pairedBlogs = _.toPairsIn(groupedBlogs).map((group) => ({author: group[0], likes:group[1]}))
    const aBlogs = _.map(pairedBlogs, ({author, likes}) => {
        const newlikes = _.reduce(likes, (a, b) => a + b.likes, 0);
        return {author, likes: newlikes};
    })
    const sortedBlogs = _.sortBy(aBlogs, (blog) => blog.likes);
    const mostLiked = _.findLast(sortedBlogs);
    return mostLiked;
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}