import { Schema, model, Model } from "mongoose";
import { IUserEntity } from "../../entities/iUserEntity";

const schema = new Schema<IUserEntity>({
  name: { type: String },
  lastName: { type: String },
  documentNumber: { type: String },
  email: { type: String, index: true, unique: true },
});

export const UserModel: Model<IUserEntity> = model<IUserEntity>(
  "users",
  schema
);
