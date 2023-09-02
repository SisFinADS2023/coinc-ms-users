import { APIGatewayProxyResult } from "aws-lambda";
import { injectable, inject } from "inversify";
import { GetUserUseCase } from "../../business/usecases/getUserUseCase";
import { IGetUserInput } from "../../business/usecases/input/iGetUserInput";

@injectable()
export class UserController {
  constructor(@inject(GetUserUseCase) private getUserUseCase: GetUserUseCase) {}

  public getUser(input: IGetUserInput): Promise<APIGatewayProxyResult> {
    let response: APIGatewayProxyResult;
    try {
      this.getUserUseCase.exec(input);
      return this.getResponse(200, { success: true });
    } catch (error) {
      return this.getResponse(400, error);
    }
  }

  private getResponse(statusCode: Number, data: Object): any {
    return {
      statusCode: statusCode,
      body: JSON.stringify(data),
    };
  }
}
