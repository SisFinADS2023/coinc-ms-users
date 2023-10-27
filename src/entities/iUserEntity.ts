<<<<<<< HEAD
import { ObjectId } from 'bson';

export interface IUserEntity {
  _id: ObjectId;
  documentNumber: String;
  firstName: String;
  lastName: String;
=======
import { ObjectId } from "bson";

export interface IUserEntity {
  _id: ObjectId;
  name: String;
  lastName: String;
  documentNumber: String;
>>>>>>> 69f5e7e9d2856f738ef3985763e15c8e0ab16af6
  email: String;
  password: String;
}
