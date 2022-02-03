import { Document, Model, model, Schema, Types } from 'mongoose';
import { IUser } from './user.model';



const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    avatar: { type: String, required: false },
    spots: [ { type: Types.ObjectId, required: true, ref: 'Spot' } ],
})

const User: Model<IUser> = model('User', userSchema);
export default User;
