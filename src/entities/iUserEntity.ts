import { ObjectId } from 'bson';

export interface IUserEntity {
  _id: ObjectId;
  documentNumber: String;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
}
