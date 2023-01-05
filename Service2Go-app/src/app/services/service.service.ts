import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../class/service';
import { catchError, tap, map } from 'rxjs/operators';

// const initialService: Service[] = [
//   {
//     id: 0,
//     idUser: 0,
//     usernameUser: 'Tarik A',
//     requestService: {
//       categorie: 'Informatique',
//       description: 'Lorem ipsum dolor Informatique',
//     },
//     givenService: {
//       categorie: 'Plomberie',
//       description: 'Lorem ipsum dolor Plomberie',
//     },
//     createAt: Date(),
//   },
//   {
//     id: 1,
//     idUser: 1,
//     usernameUser: 'Marti',
//     requestService: {
//       categorie: 'Informatique',
//       description: 'Lorem ipsum dolor Informatique',
//     },
//     givenService: {
//       categorie: 'Plomberie',
//       description: 'Lorem ipsum dolor Plomberie',
//     },
//     createAt: Date(),
//   },
//   {
//     id: 2,
//     idUser: 2,
//     usernameUser: 'Admin',
//     requestService: {
//       categorie: 'Informatique',
//       description: 'Lorem ipsum dolor Informatique',
//     },
//     givenService: {
//       categorie: 'Plomberie',
//       description: 'Lorem ipsum dolor Plomberie',
//     },
//     createAt: Date(),
//   },
// ];

const url = 'https://service2go-4dc96-default-rtdb.europe-west1.firebasedatabase.app';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private serviceUrl = 'api/services'; // API URL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  // // Save a array of services
  // save(): void {
  //   this.http.put(url + '/service.json', initialService).subscribe();
  // }


// GET all services
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(url + '/service.json').pipe(
      tap((services) => console.log('appel ok')),
      map((services) => {
        console.log(services);
        return services;
      }),
      catchError((error) => {
        console.error("Erreur sur l'appel getServices", error);
        return [];
      })
    );
  }

  // GET one service by his id
  getService(id: number): Observable<any> {
    return this.http.get<Service[]>(url+ "/service.json").pipe(
      tap((service) => console.log('appel ok')),
      map((services) => {
        console.log(services);
        for ( let service of services ) {
          if (service.id === id) {
            return service;
          }
        }
        console.log("service introuvable dans la bdd!")
        return null;
      }),
      catchError((error) => {
        console.error("Erreur sur l'appel getServices", error);
        return [];
      })
    );
  }

  // TODO POST one service
  addService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.serviceUrl, service, this.httpOptions);
  }
}
