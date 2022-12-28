import { Schema } from 'mongoose';

interface IQuestion {
  _id: Schema.Types.ObjectId;
  item: string;
  tag: string;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    item: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'questions',
    timestamps: true,
  }
);

export { QuestionSchema };
