import express from 'express';
import { getUsers, login, signup, uploadAvatar } from '../controllers/users.controller'
import { check } from 'express-validator'
import { fileUpload } from '../middlewares/file-upload.middleware'


const router = express.Router()


router.get('/', getUsers);
router.post('/signup', [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
], signup);
router.post('/login', login);
router.post('/uploadAvatar', fileUpload.single('avatar'), uploadAvatar);

export default router;
