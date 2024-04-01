const reviewService = require('../services/reviewService');
const { validationResult } = require('express-validator');

exports.submitReview = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { bookId, userId, rating, comment } = req.body;

    try {
        const review = await reviewService.saveReview(bookId, userId, rating, comment);

        res.status(201).json(review);
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ message: error });
    }
};


exports.getReviewsByBookId = async (req, res) => {
    const { bookId } = req.params;
    try {
        const reviews = await reviewService.getReviewsByBookId(bookId);
        res.json(reviews);
    } catch (error) {
        console.error('Error getting reviews:', error);
        res.status(500).json({ message: 'Failed to get reviews' });
    }
}