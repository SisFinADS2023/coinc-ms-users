import { injectable, inject } from "inversify";
import { Either, left, right, fold } from "fp-ts/Either";
import { IUserRepository } from "../contracts/repositories/iUserRepository";
import { UserOutput } from "./output/userOutput";
import { IUseCase } from "../contracts/usecases/iUseCase";
import { IGetUserInput } from "./input/iGetUserInput";

@injectable()
export class GetUserUseCase implements IUseCase<IGetUserInput, UserOutput> {
  constructor(
    @inject("IUserRepository")
    private userRepository: IUserRepository
  ) {}

  async exec(input: IGetUserInput): Promise<UserOutput> {
    try {
      const user = await this.userRepository.get(input.userId);
      return right(user);
    } catch (error) {
      return left({
        code: "USC-002",
        message: "User Failed on Retrieve",
        shortMessage: "User Failed",
      });
    }
  }
}
