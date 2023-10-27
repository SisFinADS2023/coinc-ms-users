import {  Schema, model, Model } from "mongoose";
import { IUserEntity } from "../../entities/iUserEntity";


const schema = new Schema<IUserEntity>({
  documentNumber:{type: String,index: true,unique: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, index: true, unique: true },
});

export const UserModel: Model<IUserEntity> = model("User", schema);
