import "reflect-metadata";

import { GetUserUseCase } from "./../../../src/business/usecases/getUserUseCase";
import { IUserRepository } from "./../../../src/business/contracts/repositories/iUserRepository";
import { UserOutput } from "./../../../src/business/usecases/output/userOutput";
import { IGetUserInput } from "./../../../src/business/usecases/input/iGetUserInput";
import { UserNotFound, GetUserFailed } from "./../../../src/business/errors";
import { IUserEntity } from "./../../../src/entities/iUserEntity";
import { IError } from "./../../../src/business/contracts/iError";

import * as E from "fp-ts/Either";

describe(GetUserUseCase.name, () => {
  let userRepositoryMockGetFunction: jest.Mock;
  let userRepositoryMock: IUserRepository;
  let getUserUseCase: GetUserUseCase;
  let userOutput: UserOutput;
  let userInput: IGetUserInput;
  let result: UserOutput;

  beforeEach(() => {
    userRepositoryMockGetFunction = jest.fn();
    userRepositoryMock = {
      show: userRepositoryMockGetFunction,
      create: jest.fn(),
    };
    getUserUseCase = new GetUserUseCase(userRepositoryMock);
  });

  describe("When success", () => {
    it("should return a user when found", async () => {
      userInput = {
        userId: "123",
      };

      userOutput = E.right<IError, IUserEntity>({
        userId: "123",
        documentNumber: "12345678910",
        name: "test",
        email: "email@email.com",
      });

      userRepositoryMockGetFunction.mockResolvedValueOnce(userOutput);

      result = await getUserUseCase.exec(userInput);

      expect(userRepositoryMockGetFunction).toHaveBeenCalledWith(
        userInput.userId
      );
      expect(result).toEqual(E.right(userOutput));
    });
  });

  describe("When error", () => {
    it("should return UserNotFound when user is not found", async () => {
      userRepositoryMockGetFunction.mockResolvedValueOnce(null);

      userInput.userId = "123";

      result = await getUserUseCase.exec(userInput);

      expect(userRepositoryMockGetFunction).toHaveBeenCalledWith("123");
      expect(result).toEqual(E.left(UserNotFound));
    });

    it("should return GetUserFailed when an error occurs", async () => {
      userRepositoryMockGetFunction.mockRejectedValueOnce(
        new Error("Test Error")
      );

      result = await getUserUseCase.exec(userInput);

      expect(userRepositoryMockGetFunction).toHaveBeenCalledWith(
        userInput.userId
      );
      expect(result).toEqual(E.left(GetUserFailed));
    });
  });
});
