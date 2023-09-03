import { container } from "./container";
import { RepositoriesModule } from "./repositoriesModule";
import { ModelsModule } from "./modelsModule";
import { UseCasesModule } from "./useCasesModule";
import { ControllerModule } from "./controllerModule";

container.load(ControllerModule);
container.load(UseCasesModule);
container.load(ModelsModule);
container.load(RepositoriesModule);
