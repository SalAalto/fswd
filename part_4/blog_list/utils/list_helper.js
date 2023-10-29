// Sample dummy function, serves as placeholder
const dummy = (blogs) => {
    // Sample implementation
    return 1;
}

// Calculate the total number of likes across all blogs
const totalLikes = (blogs = []) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0);
}

// Retrieve the blog post with the highest number of likes
const favoriteBlog = (blogs = []) => {
    const topBlog = blogs.reduce((a, b) => a.likes > b.likes ? a : b, {});
    return { title: topBlog.title, author: topBlog.author, likes: topBlog.likes };
}

// Determine the author with the most blog posts
const mostBlogs = (blogs = []) => {
    const authorBlogCounts = {};

    blogs.forEach(blog => {
        authorBlogCounts[blog.author] = (authorBlogCounts[blog.author] || 0) + 1;
    });

    const topAuthor = Object.keys(authorBlogCounts).reduce((a, b) => authorBlogCounts[a] > authorBlogCounts[b] ? a : b);
    return { author: topAuthor, blogs: authorBlogCounts[topAuthor] };
}

// Determine the author with the most likes across their blogs
const mostLikes = (blogs = []) => {
    const authorLikeCounts = {};

    blogs.forEach(blog => {
        authorLikeCounts[blog.author] = (authorLikeCounts[blog.author] || 0) + blog.likes;
    });

    const topAuthor = Object.keys(authorLikeCounts).reduce((a, b) => authorLikeCounts[a] > authorLikeCounts[b] ? a : b);
    return { author: topAuthor, likes: authorLikeCounts[topAuthor] };
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
