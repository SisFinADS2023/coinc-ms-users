import "reflect-metadata";
import { UserRepository } from "./../../../src/frameworks/repositories/userRepository";
import { Model, Schema } from "mongoose";
import { IUserEntity } from "./../../../src/entities/iUserEntity";

describe(UserRepository.name, () => {
  let userModelFindOneMockFunction: jest.Mock;
  let userModelMock: Model<IUserEntity>;
  let userRepository: UserRepository;
  let userId: string;

  beforeEach(() => {
    userModelFindOneMockFunction = jest.fn();

    const schema = new Schema<IUserEntity>({
      _id: { type: Object },
      documentNumber: { type: String, index: true, unique: true },
      name: { type: String },
      email: { type: String, index: true, unique: true },
    });

    userModelMock = {
      findOne: userModelFindOneMockFunction,
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
  });

  describe("When error", () => {
    it("should return UserNotFound when user is not found", async () => {
      userModelFindOneMockFunction.mockResolvedValueOnce(null);
      let result = await userRepository.show(userId);

      expect(userModelMock.findOne).toHaveBeenCalledWith({ userId });
      expect(result).toEqual(null);
    });

    it("should return GetUserFailed when an error occurs", async () => {
      const errorMock = new Error("Test Error");
      userModelFindOneMockFunction.mockRejectedValueOnce(errorMock);
      expect(userModelMock.findOne).toThrow(errorMock);
    });
  });
});
