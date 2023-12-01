import "reflect-metadata";

import { ObjectId } from 'bson'
import { CreateUserUseCase } from "./../../../src/business/usecases/createUserUseCase";
import { IUserRepository } from "./../../../src/business/contracts/repositories/iUserRepository";
import { UserOutput } from "./../../../src/business/usecases/output/userOutput";
import { ICreateUserInput } from "./../../../src/business/usecases/input/iCreateUserInput";
import { CreateUserFailed, DuplicateEmailError} from "./../../../src/business/errors";
import { IUserEntity } from "./../../../src/entities/iUserEntity";
import { IError } from "./../../../src/business/contracts/iError";
import { UserEntity } from "./../../../src/entities/userEntity";
import * as E from "fp-ts/Either";

describe(CreateUserUseCase.name, () => {
    let userRepositoryMockCreateFunction: jest.Mock;
    let userRepositoryMock: IUserRepository;
    let createUserUseCase: CreateUserUseCase;
    let userOutput: UserOutput;
    let userInput: ICreateUserInput;
    let result: UserOutput;

    beforeEach(() => {
        userRepositoryMockCreateFunction = jest.fn();
        userRepositoryMock = {
            create: userRepositoryMockCreateFunction,
            show: jest.fn(),
            update: jest.fn(),
            list: jest.fn(),
            delete: jest.fn()
        };
        createUserUseCase = new CreateUserUseCase(userRepositoryMock);
    });

    describe("When sucess", () => {
        it("should create a new user", async () => {
            userInput = {
                name: "Teste",
                lastName: "Teste",
                email: "teste@email.com",
            }

            
            userOutput = E.right<IError, IUserEntity>({                
                _id: new ObjectId(),
                name: "Teste",
                lastName: "Teste",
                email: "teste@email.com",
            });


            const userEntity = new UserEntity("Teste", "Teste", "teste@email.com");


            userRepositoryMockCreateFunction.mockResolvedValueOnce(userOutput);

            const result = await createUserUseCase.exec(userInput);
            expect(userRepositoryMockCreateFunction).toHaveBeenCalledWith(userEntity);
            expect(result).toEqual(E.right(userOutput));
        });
    });


    describe("When error", () => {
        it("should return CreateUserFailed when an error occurs", async () => {
            userRepositoryMockCreateFunction.mockRejectedValueOnce(
                new Error("Error on create user")
            );
            result = await createUserUseCase.exec(userInput);

            const userEntity = new UserEntity("Teste", "Teste", "teste@email.com");
            expect(userRepositoryMockCreateFunction).toHaveBeenCalledWith(userEntity);
            expect(result).toEqual(E.left(CreateUserFailed));
        });
        it("should return CreateUserFailed when an error occurs", async () => {
            userRepositoryMockCreateFunction.mockRejectedValueOnce(
               {
                name:"Duplicate key error",
                code: "11000"
               }
            );
            result = await createUserUseCase.exec(userInput);

            const userEntity = new UserEntity("Teste", "Teste", "teste@email.com");
            expect(userRepositoryMockCreateFunction).toHaveBeenCalledWith(userEntity);
            expect(result).toEqual(E.left(DuplicateEmailError));
        });
    });
});