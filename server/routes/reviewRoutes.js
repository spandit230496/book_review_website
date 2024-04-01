const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const validation = require('../middleware/validation');


/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a review
 *     description: Add a new review for a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Successfully added review
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/reviews', validation.validateReviewSubmission, reviewController.submitReview);
router.get('/reviews/:bookId', reviewController.getReviewsByBookId);

module.exports = router;
