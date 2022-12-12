import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../class/service';
import { catchError, tap, map } from 'rxjs/operators';

// const initialService: Service[] = [
//   new Service(0,
//     {
//       categorie: "Plomberie",
//       description: "Lorem ipsum dolor"
//     },
//     {
//       categorie: "Informatique",
//       description: "Lorem ipsum dolor"
//     }
//   ),
//   new Service(1,
//     {
//       categorie: "Plomberie",
//       description: "Lorem ipsum dolor"
//     },
//     {
//       categorie: "Informatique",
//       description: "Lorem ipsum dolor"
//     }
//   )
// ]

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private serviceUrl = 'api/services'; // API URL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http:HttpClient ) {}

  // GET all services
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.serviceUrl).pipe(
      tap(services => console.log("appel ok")),
      map(services =>  {
        return services;
      }),
      catchError( error => {
        console.error("Erreur sur l'appel getServices", error);
        return [];
      })
    )
  }

  // GET one service by his id
  getService(id : number): Observable<Service[]> {
    const url = `${this.serviceUrl}/${id}`;
    return this.http.get<Service[]>(url).pipe(
      tap(service => console.log("appel ok")),
      map(service =>  {
        return service;
      }),
      catchError( error => {
        console.error("Erreur sur l'appel getServices", error);
        return [];
      })
    )
  }

  // POST one service
  addService(service:Service):Observable<Service> {
    return this.http.post<Service>(this.serviceUrl, service, this.httpOptions);
  }

}
