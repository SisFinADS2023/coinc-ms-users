import "reflect-metadata";
import { UserRepository } from "./../../../src/frameworks/repositories/userRepository";
import { Model, Schema } from "mongoose";
import { IUserEntity } from "./../../../src/entities/iUserEntity";
import { when } from "ts-mockito";
import * as E from "fp-ts/Either";

describe(UserRepository.name, () => {
  let userModelFindOneMockFunction: jest.Mock;
  let userModelCreateMockFunction: jest.Mock;
  let userModelMock: Model<IUserEntity>;
  let userRepository: UserRepository;
  let userId: string;
 

  beforeEach(() => {
    userModelFindOneMockFunction = jest.fn();
    userModelCreateMockFunction = jest.fn();

    userModelMock = {
      findOne: userModelFindOneMockFunction,
      create: userModelCreateMockFunction
    } as unknown as Model<IUserEntity>;

    userRepository = new UserRepository(userModelMock);
  });

  describe("When success", () => {
    it("should return the expected user from the collection", async () => {
      userId = "123";

      const userMock = {
        userId: "123",
        name: "Maria Fernanda de Souza",
        email: "mariafernanda@email.com",
      };

      const userDocumentMock = {
        ...userMock,
        _id: "object-id",
        __v: 1,

        toObject: jest.fn(),
      };

      userModelFindOneMockFunction.mockResolvedValueOnce(userDocumentMock);
      const result = await userRepository.show(userId);
      expect(userModelFindOneMockFunction).toHaveBeenCalledWith({ userId });
      expect(result).toEqual(userDocumentMock);
    });

    it("should return a user when user is created", async () => {

     const userEntity = {
        _id: "12345",
        name: "Test",
        email: "test@test.com",
        password: "123456",
        documentNumber: "12345678910",
        }

      userModelCreateMockFunction.mockResolvedValueOnce(userEntity)
      const result = await userRepository.create(userEntity);
      expect(result).toEqual({
        _id: "12345",
        name: "Test",
        email: "test@test.com",
        password: "123456",
        documentNumber: "12345678910",
      });
  });

  });

  describe("When error", () => {
    it("should return UserNotFound when user is not found", async () => {
      userModelFindOneMockFunction.mockResolvedValueOnce(null);
      let result = await userRepository.show(userId);

      expect(userModelMock.findOne).toHaveBeenCalledWith({ userId });
      expect(result).toEqual(null);
    });

    it("should throw internal server error", async () => {
      const errorMock = new Error("Test Error");

      userModelFindOneMockFunction.mockRejectedValueOnce(errorMock);

      await expect(userRepository.show(userId)).rejects.toThrowError(errorMock);
    });
    const userEntity = {
      name: "Test",
      email: "test@test.com",
      password: "123456",
      documentNumber: "12345678910",
      }

    it("should return an error when user is not created", async () => {
      const errorMock = new Error("Create Func Error");
      userModelCreateMockFunction.mockRejectedValueOnce(errorMock)
      await expect(userModelMock.create(userEntity)).rejects.toThrowError(errorMock);
  });
  });
});