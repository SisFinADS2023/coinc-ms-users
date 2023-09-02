import { injectable, inject } from "inversify";
import { left, right } from "fp-ts/Either";
import { IUserRepository } from "../contracts/repositories/iUserRepository";
import { UserOutput } from "./output/userOutput";
import { IUseCase } from "../contracts/usecases/iUseCase";
import { IGetUserInput } from "./input/iGetUserInput";
import { GetUserFailed, UserNotFound } from "./../errors";

@injectable()
export class GetUserUseCase implements IUseCase<IGetUserInput, UserOutput> {
  constructor(
    @inject(Symbol.for("IUserRepository"))
    private userRepository: IUserRepository
  ) {}

  async exec(input: IGetUserInput): Promise<UserOutput> {
    try {
      const user = await this.userRepository.get(input.userId);

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
