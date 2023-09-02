import { ContainerModule, interfaces } from "inversify"

import { IUserRepository } from "./../../business/contracts/repositories/IUserRepository";
import { UserRepository } from "./../repositories/UserRepository";

export const RepositoriesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>(Symbol.for("IUserRepository")).to(UserRepository)
})
