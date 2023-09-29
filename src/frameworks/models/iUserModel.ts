import { Document } from "mongoose";

export interface IUserModel extends Document {
  userId: string;
  name: string;
  email: string;
}
