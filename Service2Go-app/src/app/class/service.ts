export class Service {

    id:number;
    idUser:number;
    usernameUser: string;
    requestService: object;
    givenService: object;
    createAt:string

    constructor(id:number, idUser:number,usernameUser: string, requestService:object, givenServices:object, ) {
        this.id = id;
        this.idUser = idUser;
        this.usernameUser = usernameUser;
        this.requestService = requestService;
        this.givenService = givenServices;
        this.createAt = Date();
    }

}
