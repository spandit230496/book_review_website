const Review = require('../models/reviewModel');

exports.saveReview = async (bookId, userId, rating, comment) => {
    try {
        const review = new Review({ bookId, userId, rating, comment });
        return await review.save();
    } catch (error) {
        console.error('Error saving review:', error);
        throw new Error('Failed to save review');
    }
};

exports.getReviewsByBookId = async (bookId) => {
    try {
        const reviews = await Review.find({ "bookId":bookId });
        return reviews;
    } catch (error) {
        console.error('Error getting reviews:', error);
        throw new Error('Failed to get reviews');
    }
};
