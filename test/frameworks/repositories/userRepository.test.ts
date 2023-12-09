import "reflect-metadata";
import { UserRepository } from "./../../../src/frameworks/repositories/userRepository";
import { Model, Schema } from "mongoose";
import { IUserEntity } from "./../../../src/entities/iUserEntity";
import { ObjectId } from "bson";

describe(UserRepository.name, () => {
  let userModelFindByIdMockFunction: jest.Mock;
  let userModelFindOneAndUpdateMockFunction: jest.Mock;
  let userModelMock: Model<IUserEntity>;
  let userRepository: UserRepository;
  let _id: string;

  beforeEach(() => {
    userModelFindByIdMockFunction = jest.fn();
    userModelFindOneAndUpdateMockFunction = jest.fn();

    userModelMock = {
      findById: userModelFindByIdMockFunction,
      findOneAndUpdate: userModelFindOneAndUpdateMockFunction,
    } as unknown as Model<IUserEntity>;

    userRepository = new UserRepository(userModelMock);
  });

  describe("When success", () => {
    it("should return the expected user from the collection", async () => {
      const userMock = {
        _id: _id,
        name: "Maria Fernanda",
        lastName: "Souza",
        email: "mariafernanda@email.com",
      };

      const userDocumentMock = {
        ...userMock,
        __v: 1,
        toObject: jest.fn(),
      };

      userModelFindByIdMockFunction.mockResolvedValueOnce(userDocumentMock);
      const result = await userRepository.show(_id);
      expect(userModelFindByIdMockFunction).toHaveBeenCalledWith(_id);
      expect(result).toEqual(userDocumentMock);
    });
  });

  describe("When user is not found", () => {
    it("should return null", async () => {
      userModelFindByIdMockFunction.mockResolvedValueOnce(null);
      let result = await userRepository.show(_id);

      expect(userModelMock.findById).toHaveBeenCalledWith(_id);
      expect(result).toEqual(null);
    });
  });

  describe("when error occurs", () => {
    it("should throw internal server error", async () => {
      const errorMock = new Error("Test Error");

      userModelFindByIdMockFunction.mockRejectedValueOnce(errorMock);

      await expect(userRepository.show(_id)).rejects.toThrowError(errorMock);
    });
  });

  describe("update user", () => {
    describe("when success", () => {
      it("should return the expected updated user from the collection", async () => {
        const userMock: IUserEntity = {
          _id: new ObjectId(_id),
          name: "Maria Fernanda",
          lastName: "Souza",
          email: "mariafernanda@email.com",
        };

        const userDocumentMock = {
          ...userMock,
          __v: 1,
          toObject: jest.fn(),
        };

        userModelFindOneAndUpdateMockFunction.mockResolvedValueOnce(
          userDocumentMock
        );
        const result = await userRepository.update(userMock);
        expect(userModelFindOneAndUpdateMockFunction).toHaveBeenCalledWith(
          { _id: userMock._id },
          userMock,
          { returnOriginal: false }
        );
        expect(result).toEqual(userDocumentMock);
      });
    });
    describe("When failure", () => {});
  });
});
