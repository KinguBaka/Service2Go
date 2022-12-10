import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  private serviceUrl = 'api/services'; // API URL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http:HttpClient ) {

  }

  // POST one service
  addUser(service:Service):Observable<Service> {
    return this.http.post<Service>(this.serviceUrl, service, this.httpOptions);
  }
}
