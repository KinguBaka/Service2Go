export class Service {

    id:number;
    idUser:number;
    usernameUser: string;
    requestService: object;
    givenService: object;
    createAt:string
    private static index:number = 0;

    constructor(idUser:number,usernameUser: string, requestService:object, givenServices:object, ) {
        this.id = Service.index++;
        this.idUser = idUser;
        this.usernameUser = usernameUser;
        this.requestService = requestService;
        this.givenService = givenServices;
        this.createAt = Date();
    }

}
