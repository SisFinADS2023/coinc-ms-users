import { ContainerModule, interfaces } from "inversify";
import * as models from "./../models";

export const ModelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<typeof models.UserModel>(models.UserModel).toConstructor(
    models.UserModel
  );
});
