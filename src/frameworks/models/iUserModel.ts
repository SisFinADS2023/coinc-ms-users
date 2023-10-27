import { Document } from "mongoose";
import { BSON } from "bsonfy";

export interface IUserModel extends Document {
  _id: BSON.ObjectId;
  name: string;
  email: string;
}
