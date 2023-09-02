import { ContainerModule, interfaces } from "inversify";

import { IUserRepository } from "./../../business/contracts/repositories/iUserRepository";
import { UserRepository } from "./../repositories/userRepository";

export const RepositoriesModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<IUserRepository>(Symbol.for("IUserRepository")).to(UserRepository);
  }
);
