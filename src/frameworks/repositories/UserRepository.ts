
import { inject, injectable } from "inversify";
import { IUserRepository } from "./../../business/contracts/repositories/IUserRepository";
import { IUser } from "./../../entities/iuser";
import { UserModel } from "./../models/UserModel";

@injectable()
export class UserRepository implements IUserRepository{
  public constructor(@inject(UserModel) private userModel: typeof UserModel) { }

  async get(userId: string): Promise<IUser | null >  {
    try {
      return await this.userModel.findOne({ where: { id: userId } })

    } catch (error) {
      throw new Error("This is an example exception.");
    }

  }
}
