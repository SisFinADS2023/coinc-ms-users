import { IUser } from "../../../entities/iuser"

export interface IUserRepository {
  get(user_id: string): Promise<IUser>
}
