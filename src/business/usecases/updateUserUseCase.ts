import { injectable, inject } from "inversify";
import { left, right } from "fp-ts/Either";
import { IUserRepository } from "../contracts/repositories/iUserRepository";
import { UserOutput } from "./output/userOutput";
import { IUpdateUseCase } from "../contracts/usecases/iUpdateUseCase";
import { IUpdateUserInput } from "./input/iUpdateUserInput";
import { UpdateUserFailed } from "../errors";
import { UserEntity } from "../../entities/userEntity";

@injectable()
export class UpdateUserUseCase
  implements IUpdateUseCase<IUpdateUserInput, UserOutput>
{
  constructor(
    @inject(Symbol.for("IUserRepository"))
    private userRepository: IUserRepository
  ) {}

  async exec(input: IUpdateUserInput): Promise<UserOutput> {
    try {
      const userEntity = new UserEntity(
        input.name,
        input.lastName,
        input.email
      );

      userEntity._id = input._id;

      const result = await this.userRepository.update(userEntity);

      if (!result) {
        return left(UpdateUserFailed);
      } else {
        return right(result);
      }
    } catch (ex) {
      return left(UpdateUserFailed);
    }
  }
}
