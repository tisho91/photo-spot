import { Document } from 'mongoose';
import { ISpot } from './spot.model';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    spots: ISpot[],
    avatar?: string;
}
