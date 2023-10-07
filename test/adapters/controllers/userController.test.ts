import "reflect-metadata";

import { APIGatewayProxyResult } from "aws-lambda";
import { UserController } from "./../../../src/adapters/controllers/userController";
import { IGetUseCase } from "./../../../src/business/contracts/usecases/iGetUseCase";
import { IGetUserInput } from "./../../../src/business/usecases/input/iGetUserInput";
import { UserOutput } from "./../../../src/business/usecases/output/userOutput";
import { UserNotFound, GetUserFailed } from "./../../../src/business/errors";
import { IUserEntity } from "./../../../src/entities/iUserEntity";
import { mock, when, instance } from "ts-mockito";

import * as E from "fp-ts/Either";
import { ObjectId } from "bson";

describe(UserController.name, () => {
  let getUserUseCaseMock: IGetUseCase<IGetUserInput, UserOutput>;
  let userController: UserController;
  let userEntity: IUserEntity;
  let userOutput: UserOutput;
  let userInput: IGetUserInput;
  let result: APIGatewayProxyResult;
  let userId: ObjectId;

  beforeEach(() => {
    getUserUseCaseMock = mock<IGetUseCase<IGetUserInput, UserOutput>>();
    userController = new UserController(instance(getUserUseCaseMock));
    userId = new ObjectId();
    userInput = { _id: userId };
    userEntity = {
      _id: userId,
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
      userOutput = E.left(UserNotFound);
      when(getUserUseCaseMock.exec(userInput)).thenResolve(
        E.left(UserNotFound)
      );

      result = await userController.getUser(userInput);
      expect(result.statusCode).toBe(400);
      expect(result.body).toEqual(JSON.stringify({ error: UserNotFound }));
    });

    it("should return GetUserFailed when error is thown", async () => {
      when(getUserUseCaseMock.exec(userInput)).thenResolve(
        E.left(GetUserFailed)
      );

      result = await userController.getUser(userInput);
      expect(result.statusCode).toEqual(400);
      expect(result.body).toEqual(JSON.stringify({ error: GetUserFailed }));
    });
  });
});
