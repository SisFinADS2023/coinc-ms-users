import { Document, Schema, model, Model } from "mongoose";

interface IUser extends Document {
  userId: string;
  cpf: string;
  name: string;
  email: string;
}

const schema = new Schema<IUser>({
  userId: { type: String, index: true, unique: true },
  cpf:{type: String,index: true,unique: true },
  name: { type: String },
  email: { type: String, index: true, unique: true },
});

export const UserModel: Model<IUser> = model("Users", schema);
