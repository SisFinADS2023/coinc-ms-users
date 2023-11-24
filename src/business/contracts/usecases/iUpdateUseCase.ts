import { IError } from "../iError";

export interface IUpdateUseCase<I, O> {
  exec(input: I): Promise<O>;
}
