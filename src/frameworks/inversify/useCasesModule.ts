import { ContainerModule, interfaces } from "inversify";

import { GetUserUseCase } from "../../business/usecases/getUserUseCase";
import { IGetUseCase } from "../../business/contracts/usecases/iGetUseCase";
import { IGetUserInput } from "../../business/usecases/input/iGetUserInput";
import { UserOutput } from "../../business/usecases/output/userOutput";

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IGetUseCase<IGetUserInput, UserOutput>>(Symbol.for("IGetUseCase")).to(
    GetUserUseCase
  );
});
