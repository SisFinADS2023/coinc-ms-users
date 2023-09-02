import { ContainerModule, interfaces } from "inversify";
import { UserModel } from "./../models/userModel";

export const ModelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<typeof UserModel>(UserModel).toConstructor(UserModel);
});
