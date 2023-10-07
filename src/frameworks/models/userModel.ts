import {  Schema, model, Model } from "mongoose";
import { IUserEntity } from "../../entities/iUserEntity";


const schema = new Schema<IUserEntity>({
  _id: { type: String, index: true, unique: true },
  documentNumber:{type: String,index: true,unique: true },
  name: { type: String },
  email: { type: String, index: true, unique: true },
  password:{type: String}
});

export const UserModel: Model<IUserEntity> = model("User", schema);
