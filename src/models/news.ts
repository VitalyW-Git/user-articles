import {Schema, model, Document} from 'mongoose';
import {INews} from '../interfaces/news.interfaces'

const newsSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    date_start: {
      required: false,
      type: Date.now
    },
  },
  {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
  },
);

const newsModel = model<INews & Document>('News', newsSchema);

export default newsModel;