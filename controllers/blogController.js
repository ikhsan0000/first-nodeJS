const Blog = require('../models/blog');

const blog_index = (req, res) =>
{
    Blog.find().sort({createdAt : -1})
    .then((result) => {
        res.render('index', { 
            title: 'Home',
            message: req.flash('message'),
            blogs: result
        });
    })
    .catch((err) => 
    {
        console.log(err);
    })
}

const blog_details = (req, res) =>
{
    const blogId = req.params.id;
    Blog.findById(blogId)
    .then((result) =>
    {
        res.render('detailsBlog', {
            title: 'Blog | Details',
            blog: result
        })
    })
    .catch((err) =>
    {
        console.log(err);
    });
}


const blog_create_get = (req, res) =>
{
    res.render('createBlog', {
        title: 'Blog | Create'
    });
    console.log('HIW');
}

const blog_create_post = (req, res) =>
{
    const requested = req.body;
    const blog = new Blog(
    {
        title: requested['blog_title'],
        snippet: requested['blog_snippet'],
        body: requested['blog_body'].trim()
    });

    console.log(requested);

    blog.save()
        .then((result) =>
        {
            req.flash('message', 'Your blog has been saved!');
            res.redirect('/');
        })
        .catch((err) =>
        {
            console.log(err);
        });

}

const blog_delete = (req, res) => 
{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result =>
    {
        res.json({ redirect : '/'})
    });
}

module.exports = 
{
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}