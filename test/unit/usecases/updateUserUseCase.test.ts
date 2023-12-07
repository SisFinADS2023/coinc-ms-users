import "reflect-metadata";

import { ObjectId } from "bson";
import { UpdateUserUseCase } from "./../../../src/business/usecases/updateUserUseCase";
import { IUserRepository } from "./../../../src/business/contracts/repositories/iUserRepository";
import { UserOutput } from "./../../../src/business/usecases/output/userOutput";
import { IUpdateUserInput } from "./../../../src/business/usecases/input/iUpdateUserInput";
import { UpdateUserFailed } from "./../../../src/business/errors";
import { IUserEntity } from "./../../../src/entities/iUserEntity";
import { IError } from "./../../../src/business/contracts/iError";
import { UserEntity } from "./../../../src/entities/userEntity";
import * as E from "fp-ts/Either";

describe(UpdateUserUseCase.name, () => {
  let userRepositoryMockUpdateFunction: jest.Mock;
  let userRepositoryMock: IUserRepository;
  let updateUserUseCase: UpdateUserUseCase;
  let userOutput: UserOutput;
  let userInput: IUpdateUserInput;
  let result: UserOutput;
  let id: ObjectId;

  beforeEach(() => {
    userRepositoryMockUpdateFunction = jest.fn();
    userRepositoryMock = {
      create: jest.fn(),
      show: jest.fn(),
      update: userRepositoryMockUpdateFunction,
      list: jest.fn(),
      delete: jest.fn(),
    };
    updateUserUseCase = new UpdateUserUseCase(userRepositoryMock);
  });

  describe("When sucess", () => {
    it("should update a user", async () => {
      id = new ObjectId(123456);
      userInput = {
        _id: id,
        name: "Teste",
        lastName: "Teste",
        email: "teste@email.com",
      };

      userOutput = E.right<IError, IUserEntity>({
        _id: id,
        name: "Teste",
        lastName: "Teste",
        email: "teste@email.com",
      });

      const userEntity = new UserEntity("Teste", "Teste", "teste@email.com");
      userEntity._id = id;

      userRepositoryMockUpdateFunction.mockResolvedValueOnce(userOutput);

      const result = await updateUserUseCase.exec(userInput);
      expect(userRepositoryMockUpdateFunction).toHaveBeenCalledWith(userEntity);
      expect(result).toEqual(E.right(userOutput));
    });
  });

  describe("When error", () => {
    it("should return UpdateUserFailed when an error occurs", async () => {
      userRepositoryMockUpdateFunction.mockRejectedValueOnce(
        new Error("Error on update user")
      );
      result = await updateUserUseCase.exec(userInput);
      const userEntity = new UserEntity("Teste", "Teste", "teste@email.com");
      userEntity._id = id;
      userInput = {
        _id: id,
        name: "Teste",
        lastName: "Teste",
        email: "teste@email.com",
      };
      expect(userRepositoryMockUpdateFunction).toHaveBeenCalledWith(userEntity);
      expect(result).toEqual(E.left(UpdateUserFailed));
    });
  });
});
