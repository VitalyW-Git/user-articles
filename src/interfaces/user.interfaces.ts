import { Document } from "mongoose"

export interface IUser extends Document {
    username: string
    email: string
    password: string
    date_start: Date
    created_at: Date
    updated_at: Date
}