import { Document, Schema, model } from "mongoose";

export type UserDocument = Document & {
  userId: string;
  name: string;
  email: string;
};

const schema = new Schema<UserDocument>({
  userId: { type: String, index: true, unique: true },
  name: { type: String },
  email: { type: String, index: true, unique: true },
});

export const UserModel = model<UserDocument>("User", schema);
