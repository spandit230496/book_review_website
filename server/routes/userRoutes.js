const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/bookmark', userController.doBookmark);
router.get("/bookmarked/:userId", userController.getBookmarked);
module.exports = router;
