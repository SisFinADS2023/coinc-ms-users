import "reflect-metadata";
import { UserRepository } from "./../../../src/frameworks/repositories/userRepository";
import { Model, Schema } from "mongoose";
import { IUserEntity } from "./../../../src/entities/iUserEntity";
import { BSON } from "bsonfy";

describe(UserRepository.name, () => {
  let userModelFindByIdMockFunction: jest.Mock;
  let userModelMock: Model<IUserEntity>;
  let userRepository: UserRepository;
  let userId: string;

  beforeEach(() => {
    userModelFindByIdMockFunction = jest.fn();

    userModelMock = {
      findById: userModelFindByIdMockFunction,
    } as unknown as Model<IUserEntity>;

    userRepository = new UserRepository(userModelMock);
  });

  describe("When success", () => {
    it("should return the expected user from the collection", async () => {
      const userMock = {
        _id: userId,
        name: "Maria Fernanda",
        lastName: "Souza",
        documentNumber: "11111111",
        email: "mariafernanda@email.com",
      };

      const userDocumentMock = {
        ...userMock,
        __v: 1,
        toObject: jest.fn(),
      };

      userModelFindByIdMockFunction.mockResolvedValueOnce(userDocumentMock);
      const result = await userRepository.show(userId);
      expect(userModelFindByIdMockFunction).toHaveBeenCalledWith(userId);
      expect(result).toEqual(userDocumentMock);
    });
  });

  describe("When user is not found", () => {
    it("should return null", async () => {
      userModelFindByIdMockFunction.mockResolvedValueOnce(null);
      let result = await userRepository.show(userId);

      expect(userModelMock.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(null);
    });
  });

  describe("when error occurs", () => {
    it("should throw internal server error", async () => {
      const errorMock = new Error("Test Error");

      userModelFindByIdMockFunction.mockRejectedValueOnce(errorMock);

      await expect(userRepository.show(userId)).rejects.toThrowError(errorMock);
    });
  });
});
