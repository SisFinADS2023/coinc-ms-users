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
  CreateUserRequest,
  CreateUserRequestSchema,
} from "./../../adapters/serializers/createUserRequest";
import "./../models/index";
import * as z from "zod";
import * as AWS from "aws-sdk";
import { Lambda } from "@aws-sdk/client-lambda";

export const createUser: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const userRequest: CreateUserRequest = CreateUserRequestSchema.parse(
      JSON.parse(event.body as string)
    );

    const userInput = {
      name: userRequest.name,
      lastName: userRequest.lastName,
      email: userRequest.email,
    };

    const userController = container.get(UserController);
    const result = await userController.createUser(userInput);
    let loginResult;
    if (result.statusCode == 200) {
      const rawResponse = await fetch(process.env.MS_AUTH_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userRequest.email,
          firstName: userRequest.name,
          lastName: userRequest.lastName,
          password: userRequest.password,
          userId: JSON.parse(result.body)._id,
        }),
      });

      loginResult = await rawResponse.json();
      if (loginResult.status !== 200) {
        throw new Error("Error with ms auth");
      }
    }

    return result;
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
