import { injectable, inject } from "inversify";
import { left, right } from "fp-ts/Either";
import { IUserRepository } from "./../contracts/repositories/iUserRepository";
import { UserOutput } from "./output/userOutput";
import { ICreateUseCase } from "./../contracts/usecases/iCreateUseCase";
import { ICreateUserInput } from "./input/iCreateUserInput";
import { CreateUserFailed} from "./../errors";
import { UserEntity } from "../../entities/userEntity";

@injectable()
export class CreateUserUseCase implements ICreateUseCase<ICreateUserInput, UserOutput> {
    constructor(
        @inject(Symbol.for("IUserRepository"))
        private userRepository: IUserRepository
    ) {}
    
    async exec(input: ICreateUserInput): Promise<UserOutput> {
        try {
        const userEntity = new UserEntity(input.name, input.email, input.documentNumber, input.password);
        const result = await this.userRepository.create(userEntity);

        if (!result) {
            return left(CreateUserFailed);
        } else {
            return right(result);
        }
        } catch (ex) {
        return left(CreateUserFailed);
        }
    }
    }