import { IUserEntity } from "../../../entities/iUserEntity";
import { ObjectId } from "bson";

export interface IUserRepository {
  show(userId: ObjectId): Promise<IUserEntity>;
}
