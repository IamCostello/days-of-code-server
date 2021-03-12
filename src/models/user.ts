import { model, Schema, Document } from "mongoose";

export type UserSaved = {
  url: string;
  archived: boolean;
};

export interface IUser extends Document {
  userId: string;
  username: string;
  email: string;
  photoURL: string;
  saved: UserSaved[];
}

const userSchema = new Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  photoURL: { type: String },
  saved: [
    {
      url: { type: String, required: true },
      archived: { type: Boolean, default: false },
    },
    { timestamps: true },
  ],
});

export default model<IUser>("User", userSchema);
