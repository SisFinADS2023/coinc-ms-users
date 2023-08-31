import { IUser } from "../../../entities/IUser"

export interface IUserRepository {
  get(user_id: string): Promise<IUser>
}
