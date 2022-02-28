import { model, Model, Schema, Types } from 'mongoose';
import User from './user.schema';
import { IImage } from './image.model';


const imageSchema: Schema = new Schema({
    uploader: { type: Types.ObjectId, required: true, ref: 'User' },
    url: { type: String, required: true },
    upVotes: { type: Number, required: false },
    downVotes: { type: Number, required: false }
})

const Image: Model<IImage> = model('Image', imageSchema);
export default Image;
