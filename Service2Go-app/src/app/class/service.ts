export class Service {

    id:number;
    idUser:number;
    requestService: object;
    givenService: object;
    createAt:string
    private static index:number = 0;

    constructor(idUser:number, requestService:object, givenServices:object, ) {
        this.id = Service.index++;
        this.idUser = idUser;
        this.requestService = requestService;
        this.givenService = givenServices;
        this.createAt = Date();
    }

}
