import { injectable, inject } from "inversify";
import { left, right } from "fp-ts/Either";
import { IUserRepository } from "./../contracts/repositories/iUserRepository";
import { UserOutput } from "./output/userOutput";
import { IGetUseCase } from "./../contracts/usecases/iGetUseCase";
import { IGetUserInput } from "./input/iGetUserInput";
import { GetUserFailed, UserNotFound } from "./../errors";

@injectable()
export class GetUserUseCase implements IGetUseCase<IGetUserInput, UserOutput> {
  constructor(
    @inject(Symbol.for("IUserRepository"))
    private userRepository: IUserRepository
  ) {}

  async exec(input: IGetUserInput): Promise<UserOutput> {
    try {
      const user = await this.userRepository.show(input.userId);
      if (!user) {
        return left(UserNotFound);
      } else {
        return right(user);
      }
    } catch (ex) {
      return left(GetUserFailed);
    }
  }
}
