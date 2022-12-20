import { Schema, model, connect } from 'mongoose';

interface IQuestion {
  _id: Schema.Types.ObjectId;
  item: string;
  tag: string;
}

const questionSchema = new Schema<IQuestion>({
  item: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});
