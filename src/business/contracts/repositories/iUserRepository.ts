import { IUserEntity } from "../../../entities/iUserEntity";

export interface IUserRepository {
  show(userId: string): Promise<IUserEntity>;
  create(userEntity: IUserEntity): Promise<boolean>;
}
