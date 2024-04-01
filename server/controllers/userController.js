const userService = require('../services/userServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const existingUser = await userService.getUserByemail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }


        const newUser = await userService.createUser({ email, password });
        res.status(201).json({message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userService.getUserByemail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' ,});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, "mysecretkey", { expiresIn: '1h' });

        res.status(200).json({ token,userId:user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.doBookmark= async(req, res) => {
try{
    const { userId, bookId } = req.body;
    const user = await userService.bookmark(userId, bookId);
    res.json("bookmarked sucessfully");
}
catch(e){
console.log(e)
}
    
};

exports.getBookmarked= async(req, res) => {
    try{
        const userId = req.params.userId;
        const user = await userService.getBookmarked(userId);
        res.json(user);
    }
    catch(e){
        console.log(e)
    }
}