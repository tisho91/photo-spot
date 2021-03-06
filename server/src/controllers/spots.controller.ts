import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express'
import {
    createNewSpot,
    deleteSpot,
    getAllSpots,
    getSpotById,
    getSpotsByUserId,
    updateSpot
} from '../services/spots.service';
import { ERROR } from '../common/constants/error-codes';
import { MESSAGE } from '../common/constants/message-strings';
import { HttpError } from '../utils/http-error';
import { Sw3Image } from '../models/image.model';


export async function getAllSpotsHandler(req: Request, res: Response, next: NextFunction) {
    const spots = await getAllSpots();
    res.json({ spots })
}

export async function getSpotByIdHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const spot = await getSpotById(req.params.spotId);
        res.json({ spot })
    } catch (error) {

        return next(new HttpError(ERROR.UNKNOWN_ERROR))
    }
}

export async function getSpotsByUserIdHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const spots = await getSpotsByUserId(req.params.userId);
        res.json({ spots })
    } catch (error) {
        return next(new HttpError(ERROR.UNKNOWN_ERROR))
    }
}

export async function createNewSpotHandler(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(ERROR.INVALID_INPUT))
    }
    // @ts-ignore
    const images = req.files.map((image: Sw3Image) => image.location);
    const input = { ...req.body, creator: req.params.userId, images };
    try {
        const spot = await createNewSpot(input)
        res.status(201).json({ spot })
    } catch (error) {
        return next(error)
    }

}

export async function updateSpotHandler(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(ERROR.INVALID_INPUT))
    }
    const { title, description } = req.body;
    const spotId = req.params.spotId;
    const userId = req.params.userId;

    try {
        const spot = await updateSpot(title, description, spotId, userId)
        res.status(200).json({ spot })
    } catch (error) {
        return next(error)
    }


}

export async function deleteSpotHandler(req: Request, res: Response, next: NextFunction) {
    const spotId = req.params.spotId;
    const userId = req.params.userId;

    try {
        await deleteSpot(spotId, userId);
        res.status(200).json({ message: MESSAGE.SPOT_DELETED })
    } catch (error) {
        return next(error)
    }
}


