import { injectable, inject } from "inversify";
import { Either, left, right, fold } from 'fp-ts/Either';
import { IUserRepository } from "../contracts/repositories/IUserRepository";
import { UserOutput } from "./output/UserOutput";
import { IUseCase } from "../contracts/usecases/IUseCase"
import { IGetUserInput } from "./input/IGetUserInput";

@injectable()
export class GetUserUseCase implements IUseCase <IGetUserInput, UserOutput> {
  constructor(@inject(Symbol.for("IUserRepository")) private userRepository: IUserRepository) { }

  async exec(input: IGetUserInput): Promise<UserOutput> {
    try {
      const user = await this.userRepository.get(input.userId);
      return right(user);
    } catch (error) {
      return left({
        code: 'USC-002',
        message: 'User Failed on Retrieve',
        shortMessage: 'User Failed'
      })
    }
  }
}
