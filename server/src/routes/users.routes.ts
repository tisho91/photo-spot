import express from 'express';
import { getCurrentUser, login, signup, updateUserProfile } from '../controllers/users.controller'
import { check } from 'express-validator'
import { fileUpload } from '../middlewares/file-upload.middleware'
import { authGuard } from '../middlewares/auth-guard.middleware';


const router = express.Router()


router.get('/me', authGuard, getCurrentUser);
router.post('/signup', [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
], signup);
router.post('/login', login);
router.patch('/me', [ authGuard, fileUpload.single('avatar') ], updateUserProfile);

export default router;
