import { IUserEntity } from "./iUserEntity";

export class UserEntity implements IUserEntity {
    public _id: string;
    constructor(
        public name: string,
        public email: string,
        public documentNumber: string,
        public password: string
    ) {
        this.name = name;
        this.email = email;
        this.documentNumber = documentNumber;
        this.password=password;
    }
}