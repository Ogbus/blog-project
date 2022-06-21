const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

const dbURI = 'mongodb+srv://iromata:pearl123@blog-totu.jkyxy.mongodb.net/blogs-totu?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// Creating a static express middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))   //this middleware is used for accepting form data
app.use(express.static('public'));

// listening for request
//app.listen(3000);

app.get('/', (req, res) => {
    //res.send('<p>The home page</p>');
    //res.sendFile('./view/index.html', {root: __dirname})
    // 
    
    res.redirect('/blogs')
});


// getting and saving data in mongoosedb
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about this new blog',
//         body: 'more about this new blog'
//     })
//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

// finding all the elements in the collection
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

// getting a single element from the database
// app.get('/single-blog', (req, res) => {
//     Blog.findById('62b0ebac65656dddb5b033a8')
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

app.get('/about', (req, res) => {
    //res.send('<p>The about page</p>');
    //res.sendFile('./view/about.html', {root: __dirname})
    res.render('about', {title: 'About'})
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create Blog'});
})
// redirecting a route
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// })

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', {title: 'All blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err);
    })
})

// Creating a blog post route
app.post('/blogs', (req, res) => {
    //console.log(req.body)
    const blog = new Blog(req.body)

    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    })
})

// 404 page
app.use((req, res) => {
    //res.status(404).sendFile('./view/404.html', {root: __dirname})
    res.status(404).render('404', {title: '404'});
})