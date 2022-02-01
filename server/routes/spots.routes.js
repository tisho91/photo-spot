const { Router } = require('express');
const { check } = require('express-validator')
const HttpError = require('../models/http-error')
const authGuard = require('../middlewares/auth-guard.middleware');
const router = Router();

const {
    getAllSpots, getSpotById, createNewSpot, updateSpot, deleteSpot, getSpotsByUserId,
} = require('../controllers/spots.controller')

router.get('/:spotId', getSpotById);

router.get('/user/:uid', getSpotsByUserId);
router.use(authGuard);

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


module.exports = router;
