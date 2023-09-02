export interface IGetUseCase<I, O> {
  exec(input: I): Promise<O>
}
