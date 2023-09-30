import { Document, Schema, model, Model } from "mongoose";

interface IUser extends Document {
  userId: string;
  documentNumber: string;
  name: string;
  email: string;
}

const schema = new Schema<IUser>({
  userId: { type: String, index: true, unique: true },
  documentNumber:{type: String,index: true,unique: true },
  name: { type: String },
  email: { type: String, index: true, unique: true },
});

export const UserModel: Model<IUser> = model("User", schema);
