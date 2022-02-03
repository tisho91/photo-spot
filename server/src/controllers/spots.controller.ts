import { HttpError } from '../utils/http-error';
import { validationResult } from 'express-validator';
import { getCoordinatesForAddress } from '../utils/location'

import mongoose from 'mongoose'


import User from '../models/user.schema'
import Spot from '../models/spot.schema'


export async function getAllSpots(req: any, res: any, next: any) {
    const spots = await Spot.find().exec();
    res.json({ spots: spots.map((spot: any) => spot.toObject({ getters: true })) })
}

export async function getSpotById(req: any, res: any, next: any) {
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

export async function getSpotsByUserId(req: any, res: any, next: any) {
    const userId = req.params.uid;
    let user: any;
    try {
        user = await User.findById(userId).populate('spots')
    } catch (error) {
        return next(error)
    }
    if (!user.spots || !user.spots.length) {
        const error = new HttpError('Spotsss not fount', 404)
        return next(error)
    }
    res.json({ spots: user.spots.map((spot: any) => spot.toObject({ getters: true })) })
}

export async function createNewSpot(req: any, res: any, next: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input', 402))
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
        coordinates
    });
    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch (error) {
        return next(new HttpError('User not found', 401));
    }
    if (!user) {
        return next(new HttpError('User not found for this id', 401));
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

export async function updateSpot(req: any, res: any, next: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input', 402))
    }
    const { title, description } = req.body;
    const spotId = req.params.spotId;

    let spot: any;
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

export async function deleteSpot(req: any, res: any, next: any) {
    const spotId = req.params.spotId;

    let spot;
    try {
        spot = await Spot.findById(spotId).populate('creator')
    } catch (error) {
        return next(error)
    }
    if (!spot) {
        return next(new HttpError('No spot found', 402))
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


