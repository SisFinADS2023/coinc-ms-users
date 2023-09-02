import { IUser } from "./../../../entities/iuser";
import { IError } from "./../../contracts/IError";
import * as E from "fp-ts/Either";

export interface IGetUserInput {
  userId: string
}
