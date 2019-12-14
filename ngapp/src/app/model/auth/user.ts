import { Role } from './role';

export class User {
    constructor(username: string, token: string, role: string) {
        this.username = username;
        this.token = token;
    }

    username: string;
    token: string;
    role: string;
}