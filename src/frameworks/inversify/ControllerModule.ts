import { ContainerModule, interfaces } from "inversify"
import { UserController } from "../../adapters/controllers/user_controller"

export const ControllerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(UserController).toSelf()
})
