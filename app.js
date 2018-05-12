const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());

const Genres = require('./models/genre');
const Book = require('./models/book');

// Connect to Mongoose
mongoose.connect("mongodb://localhost/bookstore");
const db = mongoose.connection;

app.get("/", (req, res) => {
    res.send('Please use /api/books or /api/genres');
});


// Get all genres

app.get("/api/genres", (req, res) => {
    Genres.getGenres(function(err, genres) {
        if(err) {
            throw err;
        }
        res.json(genres);
    })
});

// Add new genre

app.post("/api/genres", (req, res) => {
    const genre = req.body;
    Genres.addGenre(genre, function(err, genre) {
        if(err) {
            throw err;
        }
        res.json(genre);
    })
});

// Update a genre

app.put("/api/genres/:_id", (req, res) => {
    const id = req.params._id;
    const genre = req.body;
    Genres.updateGenre(id, genre, {}, function(err, genre) {
        if(err) {
            throw err;
        }
        res.json(genre);
    })
});

// Delete a genre

app.delete("/api/genres/:_id", (req, res) => {
    const id = req.params._id;
    Genres.removeGenre(id, function(err, genre) {
        if(err) {
            throw err;
        }
        res.json(genre);
    })
});

// Get all books
app.get("/api/books", (req, res) => {
    Book.getBooks(function(err, books) {
        if(err) {
            throw err;
        }
        res.json(books);
    })
});

// Get book by id

app.get("/api/books/:_id", (req, res) => {
    Book.getBookById(req.params._id, function(err, book) {
        if(err) {
            throw err;
        }
        res.json(book);
    })
});

// Add new book

app.post("/api/books", (req, res) => {
    const book = req.body;
    Book.addBook(book, function(err, book) {
        if(err) {
            throw err;
        }
        res.json(book);
    })
});


// Update a book

app.put("/api/books/:_id", (req, res) => {
    const id = req.params._id;
    const book = req.body;
    Book.updateBook(id, book, {}, function(err, book) {
        if(err) {
            throw err;
        }
        res.json(book);
    })
});

// Delete a book 

app.delete("/api/books/:_id", (req, res) => {
    const id = req.params._id;
    Book.removeBook(id, function(err, book) {
        if(err) {
            throw err;
        }
        res.json(book);
    })
});


// Set port to listen to
app.listen(3000);
console.log('Running on port 3000...');