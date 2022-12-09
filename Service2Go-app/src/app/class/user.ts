export class User {

    id:number;
    username:string;
    email:string;
    password:string;
    isAdmin:boolean;
    private static index:number = 0;

    constructor(username:string, email:string, password:string, isAdmin:boolean) {
        this.id = User.index++;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}
