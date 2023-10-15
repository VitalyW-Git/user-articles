import {Document} from "mongoose"

export interface INews extends Document {
  title: string
  description: string
  user: string
  date_start: Date
  created_at: Date
  updated_at: Date
}

export interface ICreateNews {
  title: string
  description: string
  user?: string | undefined
  date_start?: Date
}