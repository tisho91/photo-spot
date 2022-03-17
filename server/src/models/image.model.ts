import { Document } from 'mongoose';
import { User } from './user.model';

export interface Image extends Document {
    uploader: User['_id'],
    url: string,
    upVotes?: number,
    downVotes?: number
}

export interface Sw3Image {
location: string
}
