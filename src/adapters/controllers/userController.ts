import { APIGatewayProxyResult } from "aws-lambda";
import { injectable, inject } from "inversify";
import * as E from "fp-ts/Either";
import { IGetUseCase } from "./../../business/contracts/usecases/iGetUseCase";
import { IGetUserInput } from "./../../business/usecases/input/iGetUserInput";
import { ICreateUseCase } from "../../business/contracts/usecases/iCreateUseCase";
import { ICreateUserInput } from "../../business/usecases/input/iCreateUserInput";
import { UserOutput } from "./../../business/usecases/output/userOutput";
import _ from "lodash";
@injectable()
export class UserController {
  constructor(
    @inject(Symbol.for("IGetUseCase"))
    private getUserUseCase: IGetUseCase<IGetUserInput, UserOutput>,
    @inject(Symbol.for("ICreateUseCase"))
    private createUserUseCase: ICreateUseCase<ICreateUserInput, UserOutput>
  ) {}

  async getUser(input: IGetUserInput): Promise<APIGatewayProxyResult> {
    const result = await this.getUserUseCase.exec(input);
    console.log(result);
    if (E.isLeft(result)) {
      return this.getErrorResponse(400, result.left);
    } else {
      return this.getSuccessResponse(result.right);
    }
  }

  async createUser(userInput: ICreateUserInput): Promise<APIGatewayProxyResult> {
    try {
      if(userInput==null)
        return this.getErrorResponse(400,"Missing body content")
      
      const result = await this.createUserUseCase.exec(userInput);
  
      if (E.isLeft(result)) {
        // Tratar erro do caso de uso e retornar resposta de erro
        return this.getErrorResponse(400, result.left);
      } else {
        // Tratar sucesso do caso de uso e retornar resposta de sucesso
        return this.getSuccessResponse(result.right);
      }
    } catch (error) {
      // Tratar erros inesperados
      console.error("Erro inesperado:", error);
      return this.getErrorResponse(500, "Internal Server Error");
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
