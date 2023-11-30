import { injectable, inject } from "inversify";
import { left, right } from "fp-ts/Either";
import { IUserRepository } from "./../contracts/repositories/iUserRepository";
import { UserOutput } from "./output/userOutput";
import { ICreateUseCase } from "./../contracts/usecases/iCreateUseCase";
import { ICreateUserInput } from "./input/iCreateUserInput";
import { CreateUserFailed, DuplicateEmailError } from "./../errors";
import { UserEntity } from "../../entities/userEntity";


@injectable()
export class CreateUserUseCase
  implements ICreateUseCase<ICreateUserInput, UserOutput>
{
  constructor(
    @inject(Symbol.for("IUserRepository"))
    private userRepository: IUserRepository
  ) {}

  async exec(input: ICreateUserInput): Promise<UserOutput> {
    try {
      const userEntity = new UserEntity(
        input.name,
        input.lastName,
        input.email,
        input.password
      );

      const result = await this.userRepository.create(userEntity);

      if (!result) {
        return left(CreateUserFailed);
      } else {
        return right(result);
      }
    } catch (ex) {
      console.log("EXCETI", ex);
      if(!(ex.code == "11000")){
        return left(CreateUserFailed);
      }
      return left(DuplicateEmailError)
    }
  }
}
