const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/user.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');


const getUsers = async (req, res, next) => {
    let users
    try {
        users = await User.find({}, '-password');
    } catch (error) {
        return next(error)
    }

    res.json({ users: users.map(user => user.toObject({ getters: true })) })
}

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid email input'))
    }
    const { name, email, password } = req.body;


    let existingUser
    try {
        existingUser = await User.findOne({ email });

    } catch (error) {
        return next(error)
    }
    if (existingUser) {
        const error = new HttpError('User exists', 422);
        return next(error)
    }
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
        return next(error)
    }
    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        spots: []
    });
    try {
        await createdUser.save();
    } catch (error) {
        return next(error);
    }
    let token;

    try {
        token = jwt.sign(
            { userId: createdUser.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '1h' }
        )
    } catch (error) {
        return next(error)
    }

    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token })
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser
    try {
        existingUser = await User.findOne({ email });

    } catch (error) {
        return next(error)
    }

    if (!existingUser) {
        const error = new HttpError('Invalid credentials');
        return next(error)
    }
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (error) {
        return next(error)
    }
    if (!isValidPassword) {
        const error = new HttpError('Invalid credentials');
        return next(error)
    }
    let token;

    try {
        token = jwt.sign(
            { userId: existingUser.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '1h' }
        )
    } catch (error) {
        return next(error)
    }

    res.status(201).json({ userId: existingUser.id, email: existingUser.email, token })
}

const uploadAvatar = async (req, res, next) => {
    res.status(201).json({ avatar: req.file.location })
}

module.exports = {
    getUsers,
    signup,
    login,
    uploadAvatar
}
