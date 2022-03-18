import { Document } from 'mongoose';
import { Spot } from './spot.model';

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    spots: Spot[],
    avatar?: string;
}
