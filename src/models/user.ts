import {Schema, model, Document} from 'mongoose';
import {IUser} from '../interfaces/user.interfaces'

const userSchema = new Schema({
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 50,
        },
        password: {
            type: String,
            required: true,
            select: false,
            minlength: 3,
            maxlength: 400,
        },
        date_start: {
            required: false,
            type: Date.now
        },
        created_at: {
            required: true,
            type: Date
        },
        updated_at: {
            required: true,
            type: Date,
            default: Date.now
        }
    },
);

const userModel = model<IUser & Document>('User', userSchema);

export default userModel;