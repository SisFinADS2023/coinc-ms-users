import "reflect-metadata"
import "dotenv/config"
import { Handler, APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { UserController } from "../../adapters/controllers/user_controller";
import { container } from "../inversify/container";
import { GetUserRequest, GetUserRequestSchema } from "../../adapters/serializers/GetUserRequest"

export const getUser: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    context.callbackWaitsForEmptyEventLoop = false;
    const userController: UserController = container.get("UserController");

    const pathParams = event.pathParameters

    const userRequest: GetUserRequest = GetUserRequestSchema.parse(JSON.parse("12424"));

    return await userController.getUser(userRequest);
}

export function connectToDatabase() {
}
