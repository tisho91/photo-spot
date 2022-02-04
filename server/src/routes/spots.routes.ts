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

const router = express.Router();
router.use(authGuard);
router.get('/:spotId', getSpotByIdHandler);
router.get('/user/:uid', getSpotsByUserIdHandler);
router.get('/', getAllSpotsHandler)
router.post('/', [
    check('title').notEmpty(),
    check('address').notEmpty()
], createNewSpotHandler)
router.patch('/:spotId', [
    check('title').notEmpty(),
    check('description').isLength({ min: 5 })
], updateSpotHandler)
router.delete('/:spotId', deleteSpotHandler)

export default router;
