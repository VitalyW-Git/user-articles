import {Schema, model, Document} from 'mongoose';
import {hashSync, genSaltSync, compareSync} from 'bcrypt';
import {IUser} from '../interfaces/user.interfaces'
import {IToken} from "../interfaces/token.interfaces";
import {generateToken} from "../helper/token";

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
      select: true,
      minlength: 3,
      maxlength: 600,
    },
  },
  {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
  },
);
userSchema.methods.encryptPassword = (password: string) => hashSync(password, genSaltSync(Number(process.env.PASSWORD_SALT)));

userSchema.methods.validPassword = async function(password: string): Promise<boolean> {
  return compareSync(password, this.password);
};

userSchema.methods.getToken = async function(endTime: number): Promise<string> {
  return await generateToken(this._id, endTime);
};

const userModel = model<IUser & Document & IToken>('User', userSchema);

export default userModel;