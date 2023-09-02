import { ContainerModule, interfaces } from "inversify";

import { GetUserUseCase } from "../../business/usecases/getUserUseCase";
import { IUseCase } from "./../../business/contracts/usecases/iUseCase";

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(GetUserUseCase).toSelf();
});
