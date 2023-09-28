import { injectable, inject } from "inversify";
import { left, right } from "fp-ts/Either";
import { IUserRepository } from "./../contracts/repositories/iUserRepository";
import { UserOutput } from "./output/userOutput";
import { ICreateUseCase } from "./../contracts/usecases/iCreateUseCase";
import { ICreateUserInput } from "./input/iCreateUserInput";
import { CreateUserFailed, UserNotFound } from "./../errors";
import { UserEntity } from "../../entities/userEntity";

@injectable()
export class CreateUserUseCase implements ICreateUseCase<ICreateUserInput, UserOutput> {
    constructor(
        @inject(Symbol.for("IUserRepository"))
        private userRepository: IUserRepository
    ) {}
    
    async exec(input: ICreateUserInput): Promise<UserOutput> {
        try {
        const userEntity = new UserEntity(input.documentNumber, input.name, input.email);
        const result = await this.userRepository.create(userEntity);
    
        if (!result) {
            return left(CreateUserFailed);
        } else {
            return right(userEntity);
        }
        } catch (ex) {
        return left(CreateUserFailed);
        }
    }
    }