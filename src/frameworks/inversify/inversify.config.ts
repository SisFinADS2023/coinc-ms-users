import "reflect-metadata"

import { RepositoriesModule } from "./RepositoriesModule";
import { ModelsModule } from "./ModelsModule";
import { UseCasesModule } from "./UseCasesModule";
import { ControllerModule } from "./ControllerModule";
import { container }  from "./container";

container.load(ControllerModule)
container.load(UseCasesModule)
container.load(ModelsModule)
container.load(RepositoriesModule)
