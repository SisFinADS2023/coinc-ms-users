import "reflect-metadata";

import { CreateUserUseCase } from "./../../../src/business/usecases/createUserUseCase";
import { IUserRepository } from "./../../../src/business/contracts/repositories/iUserRepository";
import { UserOutput } from "./../../../src/business/usecases/output/userOutput";
import { ICreateUserInput } from "./../../../src/business/usecases/input/iCreateUserInput";
import { CreateUserFailed } from "./../../../src/business/errors";
import { IUserEntity } from "./../../../src/entities/iUserEntity";
import { IError } from "./../../../src/business/contracts/iError";

import * as E from "fp-ts/Either";

describe(CreateUserUseCase.name, () => {
    let userRepositoryMockCreateFunction: jest.Mock;
    let userRepositoryMock: IUserRepository;
    let createUserUseCase: CreateUserUseCase;
    let userOutput: UserOutput;
    let userInput: ICreateUserInput;
    let result: UserOutput;


    describe("createUserUseCase", () => {
        it("should create a new user", async () => {
            userInput = {
                name: "Teste",
                email: "teste@email.com",
                documentNumber: "12345678910",
                password: "123456",
            }

            userOutput = E.right<IError, IUserEntity>({ 
                userId: "123",
                documentNumber: "12345678910",
                name: "Teste",
                email: "teste@email.com",
            });
                
            const user = await createUserUseCase.exec(userInput);
            expect(user).toEqual(E.right(userOutput));
        });
    });
});