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
  CreateUserRequest
  , CreateUserRequestSchema
} from "./../../adapters/serializers/createUserRequest";
import "./../models/index";
import * as z from "zod";

export const createUser: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const userInput: CreateUserRequest = CreateUserRequestSchema.parse(
      JSON.parse(event.body as string));

    const userController = container.get(UserController);
    const result = await userController.createUser(userInput);

    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors
      .filter(err => err.code === "custom")
      .map(err => err.message);
      
      console.log("\n\n\n\n\n\n")
      console.log(error.errors)
      return {
        statusCode: 400,
        body: JSON.stringify({ messages: errorMessages }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Oh-oh! Something went wrong." }),
    };
  }
};
