import { model, Schema, Document } from "mongoose";

export interface UserSaved extends Document {
  url: string;
  archived: boolean;
  tag: string;
  creator: string;
}

const userSavedSchema = new Schema(
  {
    url: { type: String, required: true },
    archived: { type: Boolean, default: false },
    tag: { type: String, default: "none" },
    creator: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<UserSaved>("Saved", userSavedSchema);
