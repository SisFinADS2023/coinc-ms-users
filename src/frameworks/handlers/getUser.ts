import "reflect-metadata";
import "./../inversify/inversify.config";
import {
  Handler,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import { UserController } from "./../../adapters/controllers/userController";
import { container } from "./../inversify/container";
import {
  GetUserRequest,
  GetUserRequestSchema,
} from "./../../adapters/serializers/getUserRequest";
import "./../models/index";

export const getUser: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const userInput: GetUserRequest = GetUserRequestSchema.parse(
      JSON.parse(JSON.stringify(event.pathParameters))
    );

    const userController = container.get(UserController);

    const result = await userController.getUser(userInput);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
