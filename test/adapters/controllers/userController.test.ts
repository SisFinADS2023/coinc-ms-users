import "reflect-metadata";

import { APIGatewayProxyResult } from "aws-lambda";
import { UserController } from "./../../../src/adapters/controllers/userController";
import { IGetUseCase } from "./../../../src/business/contracts/usecases/iGetUseCase";
import { IGetUserInput } from "./../../../src/business/usecases/input/iGetUserInput";
import { UserOutput } from "./../../../src/business/usecases/output/userOutput";
import { UserNotFound, GetUserFailed } from "./../../../src/business/errors";
import { IUserEntity } from "./../../../src/entities/iUserEntity";
import { mock, when, instance } from "ts-mockito";
import { ObjectId } from "bson";

import * as E from "fp-ts/Either";
import { BSON } from "bsonfy";

describe(UserController.name, () => {
  let getUserUseCaseMock: IGetUseCase<IGetUserInput, UserOutput>;
  let userController: UserController;
  let userEntity: IUserEntity;
  let userOutput: UserOutput;
  let userInput: IGetUserInput;
  let result: APIGatewayProxyResult;
  let userId: string;

  beforeEach(() => {
    getUserUseCaseMock = mock<IGetUseCase<IGetUserInput, UserOutput>>();
    userController = new UserController(instance(getUserUseCaseMock));
    userId = "123456";
    userInput = { userId: userId };
    userEntity = {
      _id: new ObjectId(12456),
      name: "Test",
      lastName: "Souza",
      documentNumber: "111111111",
      email: "test@test.com",
    };
    userOutput = E.right(userEntity);
  });

  describe("When success", () => {
    it("should return a user when found", async () => {
      when(getUserUseCaseMock.exec(userInput)).thenResolve(userOutput);
      result = await userController.getUser(userInput);

      expect(result.statusCode).toBe(200);
      expect(result.body).toEqual(JSON.stringify(userEntity));
    });
  });

  describe("When error", () => {
    it("should return UserNotFound when user is not found", async () => {
      when(getUserUseCaseMock.exec(userInput)).thenResolve(
        E.left(UserNotFound)
      );

      result = await userController.getUser(userInput);
      expect(result.statusCode).toBe(404);
      expect(result.body).toEqual(JSON.stringify({ error: UserNotFound }));
    });

    it("should return GetUserFailed when error is thown", async () => {
      when(getUserUseCaseMock.exec(userInput)).thenResolve(
        E.left(GetUserFailed)
      );

      result = await userController.getUser(userInput);
      console.log(E.left(GetUserFailed));
      expect(result.statusCode).toEqual(404);
      expect(result.body).toEqual(JSON.stringify({ error: GetUserFailed }));
    });
  });
});
