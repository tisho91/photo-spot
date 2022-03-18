import express from 'express';
import { check } from 'express-validator'
import { authGuard } from '../middlewares/auth-guard.middleware';
import {
    createNewSpotHandler,
    deleteSpotHandler,
    getAllSpotsHandler,
    getSpotByIdHandler,
    getSpotsByUserIdHandler,
    updateSpotHandler
} from '../controllers/spots.controller';
import { fileUploadMultiple } from '../middlewares/file-upload.middleware';

const router = express.Router();
router.get('/user/:uid', authGuard, getSpotsByUserIdHandler);
router.get('/:spotId', authGuard, getSpotByIdHandler);
router.get('/', authGuard, getAllSpotsHandler)
router.post('/', [
    authGuard,
    fileUploadMultiple,
    check('title').notEmpty(),
    check('address').notEmpty()
], createNewSpotHandler)
router.patch('/:spotId', [
    authGuard,
    check('title').notEmpty(),
    check('description').isLength({ min: 5 })
], updateSpotHandler)
router.delete('/:spotId', authGuard, deleteSpotHandler)

export default router;
