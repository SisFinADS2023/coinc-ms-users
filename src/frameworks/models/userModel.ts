<<<<<<< HEAD
import {  Schema, model, Model } from "mongoose";
import { IUserEntity } from "../../entities/iUserEntity";

const schema = new Schema<IUserEntity>({
  documentNumber:{type: String,index: true,unique: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, index: true, unique: true },
});

export const UserModel: Model<IUserEntity> = model("User", schema);
=======
import { Schema, model, Model } from "mongoose";
import * as mongoose from "mongoose";
import { IUserEntity } from "../../entities/iUserEntity";
import { Types } from "mongoose";

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
>>>>>>> 69f5e7e9d2856f738ef3985763e15c8e0ab16af6
