const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getUserByemail = async (email) => {
    const user = await User.findOne({ email });
    return user;
};              

exports.createUser = async ({ email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    return newUser;
};  

exports.bookmark=async (userId, bookId) => {
    const user = await User.findById(userId);
    user.bookmarkedBooks.push(bookId);
    await user.save();
    return user;
};
exports.getBookmarked=async (userId) => {
    const user = await User.findById(userId).populate('bookmarkedBooks');
    return user.bookmarkedBooks;
};

