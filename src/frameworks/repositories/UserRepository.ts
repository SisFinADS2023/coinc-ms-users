
import { inject, injectable } from "inversify";
import { IUserRepository } from "./../../business/contracts/repositories/IUserRepository";
import { IUser } from "./../../entities/IUser";
import { UserModel } from "./../models/UserModel";

@injectable()
export class UserRepository implements IUserRepository{
  public constructor(@inject(UserModel) private userModel: typeof UserModel) { }

  async get(userId: string): Promise<IUser> {
    return await this.userModel.find(userId)
  }
}
