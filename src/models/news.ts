import {Schema, model, Document} from 'mongoose';
import {INews} from '../interfaces/news.interfaces'

const newsSchema = new Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
    },
    status: {
      type: Boolean,
      default: true
    },
    // ISO
    date_start: {
      required: false,
      type: Date,
      default: Date.now
    },
  },
  {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
  },
);

const newsModel = model<INews & Document>('News', newsSchema);

export default newsModel;