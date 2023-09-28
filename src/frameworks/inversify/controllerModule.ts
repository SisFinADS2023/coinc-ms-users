import { ContainerModule, interfaces } from "inversify";
import { UserController } from "./../../adapters/controllers/userController";

export const ControllerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(UserController).toSelf();
});
