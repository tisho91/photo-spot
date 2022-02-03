import { Model, model, Schema, Types } from 'mongoose';
import { ISpot } from './spot.model';
import User from './user.schema';


const spotSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    address: { type: String, required: true },
    creator: { type: Types.ObjectId, required: true, ref: 'User' },
    image: { type: String, required: true },
    coordinates: {
        lng: { type: Number, required: true },
        lat: { type: Number, required: true }
    }
})
const Spot: Model<ISpot> = model('Spot', spotSchema);
export default Spot;
