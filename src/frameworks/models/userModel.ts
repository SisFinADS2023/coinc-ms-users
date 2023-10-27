import { Document, Schema, model, Model } from "mongoose";

interface IUser extends Document {
  documentNumber: string;
  lastName: string;
  email: string;
}

const schema = new Schema<IUser>({
  documentNumber:{type: String,index: true,unique: true },
  lastName: { type: String },
  email: { type: String, index: true, unique: true },
});

export const UserModel: Model<IUser> = model("users", schema);
