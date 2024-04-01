const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: APIs related to books
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: Add a new book to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The newly created book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.post('/books', bookController.createBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get a list of books
 *     description: Retrieve a list of all books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/books', bookController.getBooks);

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Search for books
 *     description: Retrieve a list of books matching the search criteria
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Search query to match book title, author, or genre
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of books matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/books/search', bookController.searchBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Retrieve details of a specific book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the requested book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.get('/books/:id', bookController.getBookById);

module.exports = router;
