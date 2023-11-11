import { inject, injectable } from "inversify";
import { IUserRepository } from "./../../business/contracts/repositories/iUserRepository";
import { IUserEntity } from "../../entities/iUserEntity";
import { UserModel } from "./../models/userModel";
import { BSON } from "bsonfy";
import { left, right } from "fp-ts/Either";

@injectable()
export class UserRepository implements IUserRepository {
  public constructor(@inject(UserModel) private userModel: typeof UserModel) {}

  async show(userId: string): Promise<IUserEntity> {
    const user = await this.userModel.findById(userId);
    return user as IUserEntity;
  }

  async create(userObj: IUserEntity): Promise<IUserEntity> {
    const user = await this.userModel.create(userObj);

    return user as IUserEntity;
  }

  async update(userId: string, updatedUser: IUserEntity): Promise<IUserEntity> {
    throw new Error("Method not implemented.");
  }

  async list(): Promise<IUserEntity[]> {
    throw new Error("Method not implemented.");
  }

  async delete(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
