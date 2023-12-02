import { ObjectId } from "bson";

export interface IUserEntity {
  _id: ObjectId;
  name: String;
  lastName: String;
  email: String;
}
