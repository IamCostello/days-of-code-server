import { model, Schema, Document } from "mongoose";
import { UserSaved } from "./saved";

export interface IUser extends Document {
  userId: string;
  username: string;
  email: string;
  active: boolean;
  photoURL: string;
  days: number;
  saved: UserSaved[];
  tags: string[];
}

const userSchema = new Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  active: { type: Boolean, default: true },
  days: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Saved" }],
  tags: [String],
});

export default model<IUser>("User", userSchema);
