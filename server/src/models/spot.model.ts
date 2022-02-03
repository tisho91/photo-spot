import { Types } from 'mongoose'
import { IUser } from './user.model';

interface ICoordinates {
    lng: number,
    lat: number
}

export interface ISpot extends Document{
    title: string,
    description: string,
    address: string,
    creator: IUser['_id'],
    image: string,
    coordinates: ICoordinates
}
