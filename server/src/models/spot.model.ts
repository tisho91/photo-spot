import { User } from './user.model';
import { Image } from './image.model';

interface Coordinates {
    lng: number,
    lat: number
}

export interface Spot extends Document {
    title: string,
    description: string,
    address: string,
    creator: User['_id'],
    images:  Image['_id'],
    coordinates: Coordinates
}
