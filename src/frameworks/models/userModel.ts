import { Document, Schema, model, Model } from "mongoose";
import { IUserEntity } from "../../entities/iUserEntity";

const schema = new Schema<IUserEntity>({
  _id: { type: String },
  name: { type: String },
  email: { type: String, index: true, unique: true },
});

export const UserModel: Model<IUserEntity> = model<IUserEntity>("User", schema);
