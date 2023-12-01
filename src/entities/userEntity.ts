import { IUserEntity } from "./iUserEntity";
import { ObjectId } from "bson";

export class UserEntity implements IUserEntity {
  public _id: ObjectId;
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
  ) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
  }
}
