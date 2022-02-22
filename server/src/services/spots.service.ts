import Spot from '../models/spot.schema'
import { HttpError } from '../utils/http-error';
import User from '../models/user.schema';
import Image from '../models/image.schema';
import { getCoordinatesForAddress } from '../utils/location';
import mongoose, { DocumentDefinition } from 'mongoose';
import { ISpot } from '../models/spot.model';


export async function getAllSpots() {
    const spots = await Spot.find().populate('images');
    return spots.map((spot: any) => spot.toObject({ getters: true }));
}

export async function getSpotById(id: string) {
    let spot;
    try {
        spot = await Spot.findById(id);
        if (!spot) {
            throw new HttpError('Spot not fount', 404)
        }
        return spot.toObject({ getters: true })
    } catch (error) {
        throw error;
    }
}


export async function getSpotsByUserId(userId: string) {
    try {
        const user = await User.findById(userId).populate('spots');
        if (!user?.spots || !user.spots.length) {
            console.log(user)
            throw new HttpError('Spots not fount', 404)
        }
        return user.spots.map((spot: any) => spot.toObject({ getters: true }))
    } catch (error) {
        throw error
    }
}

export async function addImages(images: string[], uploader: string) {
    const createdImages = images.map(image => new Image({
        uploader,
        url: image,
        upVotes: 0,
        downVotes: 0
    }))
    try {
        await Image.insertMany(createdImages)
        return createdImages.map((image: any) => image.toObject({ getters: true }))
    } catch (error) {
        throw error;
    }
}

export async function createNewSpot(input: DocumentDefinition<ISpot>) {
    const { title, description, address, creator } = input;
    let coordinates;
    try {
        coordinates = await getCoordinatesForAddress(address);
    } catch (error) {
        throw error
    }
    const images = await addImages(input.images, creator)

    const createdSpot = new Spot({
        title,
        description,
        address,
        images,
        creator,
        coordinates
    });
    try {
        const user = await User.findById(creator);
        if (!user) {
            throw new HttpError('User not found for this id', 401)
        }
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            await createdSpot.save({ session });
            user.spots.push(createdSpot);
            await user.save({ session });
            await session.commitTransaction()

        } catch (error) {
            console.log('other errorr', error)
            throw error
        }
        return { ...createdSpot.toObject({ getters: true }), images }
    } catch (error) {
        throw new HttpError('User not found', 401);
    }
}

export async function updateSpot(title: string, description: string, spotId: string, userId: string) {
    try {
        const spot = await Spot.findById(spotId);
        if (spot?.creator.toString() !== userId) {
            throw new HttpError('Cannot edit bro', 401)
        }
        spot.title = title;
        spot.description = description;

        try {
            await spot.save();
        } catch (error) {
            throw error
        }
        return spot.toObject({ getters: true })
    } catch (error) {
        throw error
    }
}


export async function deleteSpot(spotId: string, userId: string) {
    try {
        const spot = await Spot.findById(spotId).populate('creator');
        if (!spot) {
            throw new HttpError('No spot found', 402);
        }
        if (spot.creator.toString() !== userId) {
            throw new HttpError('Cannot delete bro', 401);
        }
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            await spot.remove({ session });
            spot.creator.spots.pull(spot);
            await spot.creator.save({ session });
            await session.commitTransaction();
            return true;
        } catch (error) {
            throw error;
        }
    } catch (error) {
        throw error
    }

}
