import { inject, injectable } from "inversify";
import { IUserRepository } from "./../../business/contracts/repositories/iUserRepository";
import { IUserEntity } from "../../entities/iUserEntity";
import { UserModel } from "./../models/userModel";

@injectable()
export class UserRepository implements IUserRepository {
  public constructor(@inject(UserModel) private userModel: typeof UserModel) {}

  async show(userId: string): Promise<IUserEntity> {
    try {
      const user = await this.userModel.findOne({ userId }).exec();
      return user as IUserEntity;
    } catch (error) {
      console.log("ERRO: ", JSON.stringify(error.message));
      throw new Error(
        `Internal Server Error: ${JSON.stringify(error.message)}`
      );
    }
  }
}
