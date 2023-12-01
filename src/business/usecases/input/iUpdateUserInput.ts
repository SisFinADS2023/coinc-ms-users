import { ObjectId } from "bson";

export interface IUpdateUserInput {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
}
