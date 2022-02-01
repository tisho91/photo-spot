const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const getCoordinatesForAddress = require('../utils/location')
const Spot = require('../models/spot.schema');
const User = require('../models/user.schema');


const getAllSpots = async (req, res, next) => {
    const spots = await Spot.find().exec();
    res.json({ spots: spots.map(spot => spot.toObject({ getters: true })) })
}

const getSpotById = async (req, res, next) => {
    const spotId = req.params.spotId;
    let spot;
    try {
        spot = await Spot.findById(spotId);
    } catch (error) {
        return next(error)
    }
    if (!spot) {
        const error = new HttpError('Spot not fount', 404)
        return next(error)
    }
    res.json({ spot: spot.toObject({ getters: true }) })
}

const getSpotsByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let user;
    try {
        user = await User.findById(userId).populate('spots')
    } catch (error) {
        return next(error)
    }
    if (!user.spots || !user.spots.length) {
        const error = new HttpError('Spotsss not fount', 404)
        return next(error)
    }
    res.json({ spots: user.spots.map(spot => spot.toObject({ getters: true })) })
}

const createNewSpot = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input'))
    }
    const { title, description, address, image } = req.body;
    let coordinates;
    try {
        coordinates = await getCoordinatesForAddress(address);
    } catch (error) {
        return next(error)
    }


    const createdSpot = new Spot({
        title,
        description,
        address,
        image,
        creator: req.userData.userId,
        location: coordinates
    });
    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch (error) {
        return next(new HttpError('User not found'));
    }
    if (!user) {
        return next(new HttpError('User not found for this id'));
    }
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createdSpot.save({ session });
        user.spots.push(createdSpot);
        await user.save({ session });
        await session.commitTransaction()

    } catch (error) {
        return next(error);
    }
    res.status(201).json({ spot: createdSpot.toObject({ getters: true }) })
}

const updateSpot = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input'))
    }
    const { title, description } = req.body;
    const spotId = req.params.spotId;

    let spot;
    try {
        spot = await Spot.findById(spotId)
    } catch (error) {
        return next(error)
    }

    if (spot.creator.toString() !== req.userData.userId) {
        return next(new HttpError('Cannot edit bro', 401))
    }

    spot.title = title;
    spot.description = description;

    try {
        await spot.save();
    } catch (error) {
        return next(error)
    }

    res.status(200).json({ spot: spot.toObject({ getters: true }) })


}

const deleteSpot = async (req, res, next) => {
    const spotId = req.params.spotId;

    let spot;
    try {
        spot = await Spot.findById(spotId).populate('creator')
    } catch (error) {
        return next(error)
    }
    if (!spot) {
        return next(new HttpError('No spot found'))
    }
    if (spot.creator.toString() !== req.userData.userId) {
        return next(new HttpError('Cannot delete bro', 401))
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await spot.remove({ session });
        spot.creator.spots.pull(spot);
        await spot.creator.save({ session });
        await session.commitTransaction()
    } catch (error) {
        return next(error)
    }

    res.status(200).json({ message: 'Spot Deleted' })
}


module.exports = {
    getAllSpots,
    getSpotById,
    getSpotsByUserId,
    createNewSpot,
    updateSpot,
    deleteSpot
}
