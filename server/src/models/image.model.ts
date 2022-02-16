import { Document } from 'mongoose';
import { IUser } from './user.model';

export interface IImage extends Document {
    uploader: IUser['_id'],
    url: string,
    upVotes?: number,
    downVotes?: number
}
