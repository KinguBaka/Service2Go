import { Injectable } from '@angular/core';
import { User } from '../class/user';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const innitialUser: User[] = [
  new User("Tarik A","tarik@tarik.fr", "azerty01"),
  new User("Marti" , "marti@marti.fr", "azerty01"),
  new User("Admin", "admin@admin.fr", "azerty01")
]

const url = "https://service2go-4dc96-default-rtdb.europe-west1.firebasedatabase.app"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'api/users'; // API URL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http:HttpClient ) {

  }

  save(): void {
    this.http.put(url + '/user.json', innitialUser).subscribe();
  }


  // GET one user by his id
  getUser(id : number): Observable<User[]> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User[]>(url).pipe(
      tap(users => console.log("appel ok")),
      map(users =>  {
        return users;
      }),
      catchError( error => {
        console.error("Erreur sur l'appel getServices", error);
        return [];
      })
    )
  }

  // POST one user
  addUser(user:User):Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions).pipe(
      tap(user => console.log("user creer")),
      map(user => {
        return user;
      }),
      catchError( error => {
        console.error("Erreur sur l'appel getServices", error);
        return [];
      })
    )
  }

  //PUT one user
  updateUser(user: User) {
    return this.http.put(this.userUrl, user, this.httpOptions);
  }
}
