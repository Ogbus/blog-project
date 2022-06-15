const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listening for request
app.listen(3000);

app.get('/', (req, res) => {
    //res.send('<p>The home page</p>');
    //res.sendFile('./view/index.html', {root: __dirname})
    const blogs = [
        {title: 'kat finds eggs', snippet: 'lorem ipsum dolor sit amet consecteteur'},
        {title: 'just start it', snippet: 'lorem ipsum dolor sit amet consecteteur'},
        {title: 'learning nodejs', snippet: 'lorem ipsum dolor sit amet consecteteur'}
    ]
    res.render('index', {title: 'Home', blogs});
});

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

// 404 page
app.use((req, res) => {
    //res.status(404).sendFile('./view/404.html', {root: __dirname})
    res.status(404).render('404', {title: '404'});
})