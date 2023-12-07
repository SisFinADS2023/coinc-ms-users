import { ObjectId } from "bson";

export interface IUpdateUserInput {
  _id: ObjectId;
  name: string;
  lastName: string;
  email: string;
}
