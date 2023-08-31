import { IUser } from "../../../entities/IUser";
import { IError } from "../../contracts/IError";
import * as E from "fp-ts/Either";

export type UserOutput = E.Either<IError, IUser>
