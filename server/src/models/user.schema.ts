import { Model, model, Schema, Types } from 'mongoose';
import { User as IUser } from './user.model';


const userSchema: Schema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    avatar: { type: String, required: false },
    spots: [ { type: Types.ObjectId, required: true, ref: 'Spot' } ],
})

const User: Model<any> = model('User', userSchema);
export default User;
