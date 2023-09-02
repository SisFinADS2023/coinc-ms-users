import { IUser } from "../../../entities/iUser";

export interface IUserRepository {
  get(userId: string): Promise<IUser>;
}
