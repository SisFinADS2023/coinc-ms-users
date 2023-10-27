import { ObjectId } from "bson";

export interface IUserEntity {
  _id: ObjectId;
  name: String;
  lastName: String;
  documentNumber: String;
  email: String;
}
