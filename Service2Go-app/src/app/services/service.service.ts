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

  // Save a array of services
  save(listOfService: Service[]): void {
    this.http.put(url + '/service.json', listOfService).subscribe();
  }

  // GET all services
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(url + '/service.json').pipe(
      tap((services) => console.log('appel ok')),
      map((services) => {
        return services;
      }),
      catchError((error) => {
        console.error("Erreur sur l'appel getServices", error);
        return [];
      })
    );
  }

  // GET one service by his id
  getService(id: number): Observable<Service | any> {
    return this.http.get<Service[]>(url + '/service.json').pipe(
      tap((service) => console.log('appel ok')),
      map((services) => {
        for (let service of services) {
          if (service.id === id) {
            return service;
          }
        }
        console.log('service introuvable dans la bdd!');
        return null;
      }),
      catchError((error) => {
        console.error("Erreur sur l'appel getServices", error);
        return [];
      })
    );
  }

  // TODO POST one service
  addService(service: any): void {
    this.http.get<Service[]>(url + '/service.json').pipe(
      tap((services) => console.log('appel ok')),
      map((services) => {
        if (!services || services.length == 0) {
          services = []
          console.log("test")
        }
        let newService = new Service(
          this.checkId(services),
          0,
          'test',
          {
            'categorie': service.requestServiceCategorie,
            'description': service.requestServiceDescription,
          },
          {
            'categorie': service.givenServiceCategorie,
            'description': service.givenServiceDescription,
          }
        );
        services.push(newService);
        this.save(services);
      }),
      catchError((error) => {
        console.error("Erreur sur l'appel getServices", error);
        return [];
      })
    ).subscribe();
  }

  checkId(array: Array<any>): number {
    if (array.length > 0) {
      return Math.max(...array.map((service) => service.id)) + 1;
    } else {
      return 0;
    }
  }
}
