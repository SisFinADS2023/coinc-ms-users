import { RepositoriesModule } from "./repositoriesModule";
import { ModelsModule } from "./modelsModule";
import { UseCasesModule } from "./useCasesModule";
import { ControllerModule } from "./controllerModule";
import { container } from "./container";

container.load(ControllerModule);
container.load(UseCasesModule);
container.load(ModelsModule);
container.load(RepositoriesModule);
