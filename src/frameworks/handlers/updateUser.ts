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
  UpdateUserRequest,
  UpdateUserRequestSchema,
} from "./../../adapters/serializers/updateUserRequest";
import "./../models/index";
import * as z from "zod";

export const updateUser: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;

    const userInput: UpdateUserRequest = UpdateUserRequestSchema.parse(
      JSON.parse(event.body as string)
    );

    const userId = event.pathParameters?._id;

    if (userId) {
      const updateUserInput: IUpdateUserInput = {
        _id: userId,
        ...userInput,
      };
      const userController = container.get(UserController);
      const result = await userController.updateUser(updateUserInput);
      return result;
    } else {
      throw new Error("invalid user id");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors
        .filter((err) => err.code === "custom")
        .map((err) => err.message);

      console.log(error.errors);
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
