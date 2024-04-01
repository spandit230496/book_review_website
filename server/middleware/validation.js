const { body } = require('express-validator');

// Middleware for validating the review submission request
exports.validateReviewSubmission = [
    body('bookId').notEmpty().withMessage('Book ID is required'),
    body('userId').notEmpty().withMessage('User ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
];
