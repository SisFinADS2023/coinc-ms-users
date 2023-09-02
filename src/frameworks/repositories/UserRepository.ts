
import { inject, injectable } from "inversify";
import { IUserRepository } from "./../../business/contracts/repositories/IUserRepository";
import { IUser } from "./../../entities/iuser";
import { UserModel } from "./../models/UserModel";

@injectable()
export class UserRepository implements IUserRepository{
  public constructor(@inject(UserModel) private userModel: typeof UserModel) { }

  async get(userId: string): Promise<IUser>  {
    const user = await this.userModel.findOne({ where: { id: userId } })

    if (!user) {
      throw new Error("User not found");
    }

    return user as IUser;
  }
}
