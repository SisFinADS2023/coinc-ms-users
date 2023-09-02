import { APIGatewayProxyResult } from "aws-lambda";
import { injectable, inject } from "inversify";
import * as E from "fp-ts/Either";
import { GetUserUseCase } from "../../business/usecases/getUserUseCase";
import { IGetUserInput } from "../../business/usecases/input/iGetUserInput";

@injectable()
export class UserController {
  constructor(@inject(GetUserUseCase) private getUserUseCase: GetUserUseCase) {}

  async getUser(input: IGetUserInput): Promise<APIGatewayProxyResult> {
    let response: APIGatewayProxyResult;
    const result = await this.getUserUseCase.exec(input);
    if (E.isLeft(result)) {
      return this.getResponse(400, result);
    } else {
      return this.getResponse(200, result);
    }
  }

  private getResponse(statusCode: Number, data: Object): any {
    return {
      statusCode: statusCode,
      body: JSON.stringify(data),
    };
  }
}
