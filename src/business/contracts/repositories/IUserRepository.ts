import { IUser } from "./../../../entities/iuser";

export interface IUserRepository {
  get(userId: string): Promise<IUser>
}
