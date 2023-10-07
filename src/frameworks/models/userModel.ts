import { Schema, model, Model } from "mongoose";
import * as mongoose from "mongoose";
import { IUserEntity } from "../../entities/iUserEntity";
import { ObjectId } from "bson";

const schema = new Schema<IUserEntity>({
  name: { type: String },
  lastName: { type: String },
  documentNumber: { type: String },
  email: { type: String, index: true, unique: true },
});

export const UserModel: Model<IUserEntity> = model<IUserEntity>("users", schema);
