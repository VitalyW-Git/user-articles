import { Document } from "mongoose"

export interface IUser extends Document {
    username: string
    email: string
    password: string
    created_at: Date
    updated_at: Date
    encryptPassword: (password: string) => string;
    validPassword: (password: string) => boolean;
}