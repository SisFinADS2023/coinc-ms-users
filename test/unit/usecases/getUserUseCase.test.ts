import "reflect-metadata";

import { GetUserUseCase } from "./../../../src/business/usecases/getUserUseCase";
import { IUserRepository } from "./../../../src/business/contracts/repositories/iUserRepository";
import { UserOutput } from "./../../../src/business/usecases/output/userOutput";
import { IGetUserInput } from "./../../../src/business/usecases/input/iGetUserInput";
import { UserNotFound, GetUserFailed } from "./../../../src/business/errors";
import { IUserEntity } from "./../../../src/entities/iUserEntity";
import { IError } from "./../../../src/business/contracts/iError";
import { ObjectId } from "bson";

import * as E from "fp-ts/Either";

describe(GetUserUseCase.name, () => {
  let userRepositoryMockGetFunction: jest.Mock;
  let userRepositoryMock: IUserRepository;
  let getUserUseCase: GetUserUseCase;
  let userOutput: UserOutput;
  let userInput: IGetUserInput;
  let result: UserOutput;
  let userId: string;

  beforeEach(() => {
    userRepositoryMockGetFunction = jest.fn();
    userRepositoryMock = {
      show: userRepositoryMockGetFunction,
      create: jest.fn(),
      update: jest.fn(),
      list: jest.fn(),
      delete: jest.fn(),
    };
    getUserUseCase = new GetUserUseCase(userRepositoryMock);
    userId = "123456";
  });

  describe("When success", () => {
    it("should return a user when found", async () => {
      userInput = {
        _id: "123",
      };

      userOutput = E.right<IError, IUserEntity>({
        _id: new ObjectId(123456),
        name: "João",
        lastName: "Souza",
        documentNumber: "11111111111",
        email: "email@email.com",
        password: "123456",
      });

      userRepositoryMockGetFunction.mockResolvedValueOnce(userOutput);

      result = await getUserUseCase.exec(userInput);

      expect(userRepositoryMockGetFunction).toHaveBeenCalledWith(userInput._id);
      expect(result).toEqual(E.right(userOutput));
    });
  });

  describe("When error", () => {
    it("should return UserNotFound when user is not found", async () => {
      userRepositoryMockGetFunction.mockResolvedValueOnce(null);

      userInput._id = "123";

      result = await getUserUseCase.exec(userInput);

      expect(userRepositoryMockGetFunction).toHaveBeenCalledWith(userId);
      expect(result).toEqual(E.left(UserNotFound));
    });

    it("should return GetUserFailed when an error occurs", async () => {
      userRepositoryMockGetFunction.mockRejectedValueOnce(
        new Error("Test Error")
      );

      result = await getUserUseCase.exec(userInput);

      expect(userRepositoryMockGetFunction).toHaveBeenCalledWith(userInput._id);
      expect(result).toEqual(E.left(GetUserFailed));
    });
  });
});
