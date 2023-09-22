import { IUserEntity } from "./iUserEntity";

export class UserEntity implements IUserEntity {
    public userId: string;
    constructor(
        public CPF: string,
        public name: string,
        public email: string
    ) {
        this.CPF = CPF;
        this.name = name;
        this.email = email;
    }
}