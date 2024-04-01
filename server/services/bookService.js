const Book = require('../models/bookModel');

exports.createBook = async ({ title, author, description, genre, publishedYear }) => {
    const newBook = new Book({ title, author, description, genre, publishedYear });
    await newBook.save();
    return newBook;
};

exports.getBooks = async ({ page, limit, sortBy }) => {
    const options = {
        page,
        limit,
        sort: { [sortBy]: 1 },
    };
    const books = await Book.paginate({}, options)
    return books;
};

exports.searchBooks = async ({ query, page, limit, sortBy }) => {
    const options = {
        page,
        limit,
        sort: { [sortBy]: 1 },
    };
    const queryObj = {
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { author: { $regex: query, $options: 'i' } },
            { genre: { $regex: query, $options: 'i' } },
        ],
    };
    const books = await Book.paginate(queryObj, options);
    return books;
};

exports.getBookById = async (id) => {
    const book = await Book.findById(id);
    return book;
};

