const express = require('express');
const router = express.Router();
const { check } = require('express-validator')
const fileUpload = require('../middlewares/file-upload.middleware')

const { getUsers, signup, login, uploadAvatar } = require('../controllers/users.controller')

router.get('/', getUsers);
router.post('/signup', [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
], signup);
router.post('/login', login);
router.post('/uploadAvatar', fileUpload.single('avatar'), uploadAvatar);

module.exports = router;
