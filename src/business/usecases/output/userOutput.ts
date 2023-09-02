import { IUser } from "../../../entities/iUser";
import { IError } from "../../contracts/iError";
import * as E from "fp-ts/Either";

export type UserOutput = E.Either<IError, IUser>;
