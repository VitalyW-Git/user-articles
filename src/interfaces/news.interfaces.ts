import { Document } from "mongoose"

export interface INews extends Document {
    description: string
    date_start: Date
    created_at: Date
    updated_at: Date
}