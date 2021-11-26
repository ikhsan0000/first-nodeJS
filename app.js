// required package
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

//routes
const blogRoute = require('./routes/blogRoutes');

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
    res.redirect('/blog');
});

// app.post
app.use(blogRoute); //or write app.use('/blog', blogRoute) to omit every "/blog" in the URL at the blogRoutes.js

// if url error
app.use((req, res) =>
{
    res.status('404').render('404', {
        title: 'Oops! 404'
    });
});