import { model, Schema, Document } from "mongoose";

export type UserSaved = {
  _id: string;
  url: string;
  archived: boolean;
  tag: string;
};

export interface IUser extends Document {
  userId: string;
  username: string;
  email: string;
  photoURL: string;
  days: number;
  saved: UserSaved[];
  tags: string[];
}

const userSchema = new Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  days: { type: Number, default: 0 },
  saved: [
    {
      url: { type: String, required: true },
      archived: { type: Boolean, default: false },
      tag: { type: String, default: "none" },
    },
    { timestamps: true },
  ],
  tags: [String],
});

export default model<IUser>("User", userSchema);
