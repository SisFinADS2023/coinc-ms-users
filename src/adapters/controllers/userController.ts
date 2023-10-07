import { APIGatewayProxyResult } from "aws-lambda";
import { injectable, inject } from "inversify";
import * as E from "fp-ts/Either";
import { IGetUseCase } from "./../../business/contracts/usecases/iGetUseCase";
import { IGetUserInput } from "./../../business/usecases/input/iGetUserInput";
import { UserOutput } from "./../../business/usecases/output/userOutput";
import _ from "lodash";
@injectable()
export class UserController {
  constructor(
    @inject(Symbol.for("IGetUseCase"))
    private getUserUseCase: IGetUseCase<IGetUserInput, UserOutput>
  ) {}

  async getUser(input: IGetUserInput): Promise<APIGatewayProxyResult> {
    const result = await this.getUserUseCase.exec(input);
    if (E.isLeft(result)) {
      return this.getErrorResponse(400, result.left);
    } else {
      return this.getSuccessResponse(result.right);
    }
  }

  private getErrorResponse(
    statusCode: number,
    errorData: Object
  ): APIGatewayProxyResult {
    return {
      statusCode: statusCode,
      body: JSON.stringify({ error: errorData }),
    };
  }

  private getSuccessResponse(data: Object): APIGatewayProxyResult {
    return {
      statusCode: 200,
      body: JSON.stringify(_.omit(data, ["_tag"])),
    };
  }
}
