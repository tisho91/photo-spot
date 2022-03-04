import Spot from '../models/spot.schema'
import User from '../models/user.schema';
import Image from '../models/image.schema';
import mongoose, { DocumentDefinition } from 'mongoose';
import { ISpot } from '../models/spot.model';
import { ERROR } from '../common/constants/error-codes';


export async function getAllSpots() {
    const spots = await Spot.find().populate('images');
    return spots.map((spot: any) => spot.toObject({ getters: true }));
}

export async function getSpotById(id: string) {
    let spot;
    try {
        spot = await Spot.findById(id);
        if (!spot) {
            throw new Error(ERROR.SPOT_NOT_FOUND)
        }
        return spot.toObject({ getters: true })
    } catch (error) {
        throw new Error(ERROR.SPOT_NOT_FOUND)

    }
}


export async function getSpotsByUserId(userId: string) {
    try {
        const user = await User.findById(userId).populate('spots');
        if (!user?.spots || !user.spots.length) {
            throw new Error(ERROR.SPOT_NOT_FOUND)
        }
        return user.spots.map((spot: any) => spot.toObject({ getters: true }))
    } catch (error) {
        throw new Error(ERROR.SPOT_NOT_FOUND)
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
        throw new Error(ERROR.SPOT_NOT_FOUND)

    }
}

export async function createNewSpot(input: DocumentDefinition<ISpot>) {
    const { title, description, address, creator, coordinates } = input;
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
            throw new Error(ERROR.USER_NOT_FOUND)
        }
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            await createdSpot.save({ session });
            user.spots.push(createdSpot);
            await user.save({ session });
            await session.commitTransaction()

        } catch (error) {
            console.log('znachi tuka pyrvo')
            console.log(error)
            throw new Error(ERROR.DATABASE_ERROR)

        }
        return { ...createdSpot.toObject({ getters: true }), images }
    } catch (error) {
        console.log('ili tuka idva maj ?>?????')
        console.log(error)
        throw new Error(ERROR.USER_NOT_FOUND)
    }
}

export async function updateSpot(title: string, description: string, spotId: string, userId: string) {
    try {
        const spot = await Spot.findById(spotId);
        if (spot?.creator.toString() !== userId) {
            return new Error(ERROR.CANNOT_EDIT_SPOT)
        }
        spot.title = title;
        spot.description = description;

        try {
            await spot.save();
        } catch (error) {
            return new Error(ERROR.CANNOT_EDIT_SPOT)

        }
        return spot.toObject({ getters: true })
    } catch (error) {
        throw new Error(ERROR.CANNOT_EDIT_SPOT)
    }
}


export async function deleteSpot(spotId: string, userId: string) {
    try {
        const spot = await Spot.findById(spotId).populate('creator');
        if (!spot) {
            return new Error(ERROR.SPOT_NOT_FOUND)
        }
        if (spot.creator.toString() !== userId) {
            return new Error(ERROR.CANNOT_DELETE_SPOT)
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
            return new Error(ERROR.CANNOT_DELETE_SPOT)
        }
    } catch (error) {
        throw new Error(ERROR.CANNOT_DELETE_SPOT)
    }

}
