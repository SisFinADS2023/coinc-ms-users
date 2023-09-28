import { IUserEntity } from "./iUserEntity";

export class UserEntity implements IUserEntity {
    public userId: string;
    constructor(
        public documentNumber: string,
        public name: string,
        public email: string
    ) {
        this.documentNumber = documentNumber;
        this.name = name;
        this.email = email;
    }
}