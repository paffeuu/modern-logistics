export class User {
    constructor(username: string, token: string, role: string) {
        this.username = username;
        this.token = token;
        switch(role) {
            case "Owner": this.role = 3;
                break;
            case "Admin": this.role = 2;
                break;
            case "User": this.role = 1;
                break;
        }
    }

    username: string;
    token: string;
    role: Number;
}