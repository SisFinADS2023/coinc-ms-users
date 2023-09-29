import { IUserEntity } from "../../../entities/iUserEntity";

export interface IUserRepository {
  // Busca um usuário por ID
  show(userId: string): Promise<IUserEntity>;

  // Cria um novo usuário
  create(user: IUserEntity): Promise<Boolean>;

  // Atualiza um usuário existente
  update(userId: string, updatedUser: IUserEntity): Promise<IUserEntity>;

  // Lista todos os usuários
  list(): Promise<IUserEntity[]>;

  // Exclui um usuário por ID
  delete(userId: string): Promise<void>;
}
