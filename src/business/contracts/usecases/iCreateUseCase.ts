export interface ICreateUseCase<I, O> {
  exec(input: I): Promise<O>;
}