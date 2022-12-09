import { Injectable } from '@angular/core';
import { Service } from '../class/service';

const initialService: Service[] = [
  new Service(0,
    {
      categorie: "Plomberie",
      description: "Lorem ipsum dolor"
    },
    {
      categorie: "Informatique",
      description: "Lorem ipsum dolor"
    }
  ),
  new Service(1,
    {
      categorie: "Plomberie",
      description: "Lorem ipsum dolor"
    },
    {
      categorie: "Informatique",
      description: "Lorem ipsum dolor"
    }
  )
]

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }
}
