import { inject, injectable } from "inversify";
import { IUserRepository } from "./../../business/contracts/repositories/iUserRepository";
import { IUserEntity } from "../../entities/iUserEntity";
import { UserModel } from "./../models/userModel";
import { left, right } from "fp-ts/Either";

@injectable()
export class UserRepository implements IUserRepository {
  public constructor(@inject(UserModel) private userModel: typeof UserModel) {}

  async show(userId: string): Promise<IUserEntity> {
    try {
      const user = await this.userModel.findOne({ userId });
      return user as IUserEntity;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
