import { IUserEntity } from "../../../entities/iUserEntity";

export interface IUserRepository {
  get(userId: string): Promise<IUser>;
}
