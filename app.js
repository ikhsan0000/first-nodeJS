// required package
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const session = require('express-session');
const flash = require('connect-flash');

// express app
const app = express();

app.use(session({
    secret: 'secret',
    resave: 'false',
    saveUninitialized: false
}));

app.use(flash());

// connection to MongoDB
const dbURI = 'mongodb+srv://ikhsan:123456qwerty@nodetutorial.5cjll.mongodb.net/NodeBlog?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log('connected to db');
        app.listen(3000);       //listening port
    }).catch((err) => {
        console.log(err);
    });
    
// register view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true}));
// register static folder *must be at the very top of every route
app.use(express.static('public'));



app.get('/', (req, res) =>
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
    
});

app.post('/blog', (req, res) =>
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

});

// create blog page
app.get('/blog/create', (req, res) =>
{
    res.render('createBlog', {
        title: 'Blog | Create'
    });
});

// see 1 blog
app.get('/blog/:id', (req, res) =>
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
});

app.delete('/blog/:id',(req, res) => 
{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result =>
    {
        res.json({ redirect : '/'})
    });
});

// if url error
app.use((req, res) =>
{
    res.status('404').render('404', {
        title: 'Oops! 404'
    });
});