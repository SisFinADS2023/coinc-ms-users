import { Handler, APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { UserController } from "./../../adapters/controllers/user_controller";
import { container } from "./../inversify/container";
import { GetUserRequest, GetUserRequestSchema } from "./../../adapters/serializers/GetUserRequest"

export const getUser: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    try {
        const pathParams = event.pathParameters;
        const userRequest: GetUserRequest = GetUserRequestSchema.parse(
            JSON.parse(event.body || "{}")
        );

        const userController: UserController = container.get("UserController");
        const userData = await userController.getUser(userRequest);

        return {
            statusCode: 200,
            body: JSON.stringify(userData),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
}
