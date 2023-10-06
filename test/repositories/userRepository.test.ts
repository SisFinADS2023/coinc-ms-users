import "reflect-metadata";

import { inject, injectable } from "inversify";
import { IUserRepository } from "./../../src/business/contracts/repositories/iUserRepository";
import { IUserEntity } from "./../../src/entities/iUserEntity";
import { UserModel } from "./../../src/frameworks/models/userModel";
import { mock, when, instance } from "ts-mockito";
import { UserRepository } from "./../../src/frameworks/repositories/userRepository";

import * as E from "fp-ts/Either";
import { boolean } from "zod";

describe(UserRepository.name, () => {
  let userModelMock: typeof UserModel;
  let userRepository: IUserRepository;
  let userEntity: IUserEntity;
  let result: E.Either<Error, IUserEntity || Boolean>;

  beforeEach(() => {
    userModelMock = mock<typeof UserModel>();
    userRepository = new UserRepository(instance(userModelMock));
    userEntity = {
        userId: "12345",
        name: "Test",
        email: "test@test.com",
        password: "123456",
        documentNumber: "12345678910",
        }
    });


    describe("When success", () => {
        it("should return a user when found", async () => {
            when(userModelMock.findOne({ userId: userEntity.userId })).thenResolve();
            result = await userRepository.show(userEntity.userId);
            expect(result).toEqual(E.right(userEntity));
        });
        
        it("should return true when user is created", async () => {
            when(userModelMock.create(userEntity)).thenResolve();
            result = await userRepository.create(userEntity);
            expect(result).toEqual(E.right(true));
        });
    });
    describe("When error", () => {
        it("should return an error when user is not found", async () => {
            when(userModelMock.findOne({ userId: userEntity.userId })).thenResolve();
            result = await userRepository.show(userEntity.userId);
            expect(result).toEqual(E.left(new Error("User not found")));
        });
        
        it("should return an error when user is not created", async () => {
            when(userModelMock.create(userEntity)).thenResolve();
            result = await userRepository.create(userEntity);
            expect(result).toEqual(E.left(new Error("User not created")));
        });
    }
});
