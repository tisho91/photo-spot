import express from 'express';
import { check } from 'express-validator'
import { authGuard } from '../middlewares/auth-guard.middleware';
import {
    createNewSpot,
    deleteSpot,
    getAllSpots,
    getSpotById,
    getSpotsByUserId,
    updateSpot
} from '../controllers/spots.controller';

const router = express.Router();
router.use(authGuard);
router.get('/:spotId', getSpotById);
router.get('/user/:uid', getSpotsByUserId);
router.get('/', getAllSpots)
router.post('/', [
    check('title').notEmpty(),
    check('address').notEmpty()
], createNewSpot)
router.patch('/:spotId', [
    check('title').notEmpty(),
    check('description').isLength({ min: 5 })
], updateSpot)
router.delete('/:spotId', deleteSpot)

export default router;
