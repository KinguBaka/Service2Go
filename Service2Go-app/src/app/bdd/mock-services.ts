import { Service } from "../class/service";

export const SERVICES: Service[] = [
    {
        id : 0,
        idUser : 0,
        usernameUser: "Tarik A",
        requestService : {
            categorie: "Informatique",
            description: "Lorem ipsum dolor Informatique"
        },
        givenService : {
            categorie: "Plomberie",
            description: "Lorem ipsum dolor Plomberie"
        },
        createAt : Date()
    },
    {
        id : 1,
        idUser : 1,
        usernameUser: "Marti",
        requestService : {
            categorie: "Informatique",
            description: "Lorem ipsum dolor Informatique"
        },
        givenService : {
            categorie: "Plomberie",
            description: "Lorem ipsum dolor Plomberie"
        },
        createAt : Date()
    },
    {
        id : 2,
        idUser : 2,
        usernameUser: "Admin",
        requestService : {
            categorie: "Informatique",
            description: "Lorem ipsum dolor Informatique"
        },
        givenService : {
            categorie: "Plomberie",
            description: "Lorem ipsum dolor Plomberie"
        },
        createAt : Date()
    },
];
