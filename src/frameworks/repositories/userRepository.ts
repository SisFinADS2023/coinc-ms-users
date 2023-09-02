import { inject, injectable } from "inversify";
import { IUserRepository } from "./../../business/contracts/repositories/iUserRepository";
import { IUser } from "../../entities/iUser";
import { UserModel } from "./../models/userModel";

@injectable()
export class UserRepository implements IUserRepository {
  public constructor(@inject(UserModel) private userModel: typeof UserModel) {}

  async get(userId: string): Promise<IUser> {
    const user = await this.userModel.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    return user as IUser;
  }
}
