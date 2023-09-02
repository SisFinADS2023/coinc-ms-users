import { ContainerModule, interfaces } from "inversify";

import { GetUserUseCase } from "../../business/usecases/getUserUseCase";

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<GetUserUseCase>("GetUserUseCase").to(GetUserUseCase);
});
