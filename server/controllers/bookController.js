const bookService = require('../services/bookService');

exports.createBook = async (req, res) => {
    try {
        const { title, author, description, genre, publishedYear } = req.body;
        const newBook = await bookService.createBook({ title, author, description, genre, publishedYear });
        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy } = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sortBy: sortBy || 'createdAt', 
        };
        const books = await bookService.getBooks(options);
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.searchBooks = async (req, res) => {
    try {
        const { query, page = 1, limit = 10, sortBy } = req.query;
        console.log(query, page, limit, sortBy);
        const options = {
            query,
            page: parseInt(page),
            limit: parseInt(limit),
            sortBy: sortBy || 'createdAt', 
        };
        const books = await bookService.searchBooks(options);
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await bookService.getBookById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

