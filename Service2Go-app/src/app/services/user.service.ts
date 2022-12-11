import { Injectable } from '@angular/core';
import { User } from '../class/user';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

// const innitialUser: User[] = [
//   new User("Tarik A","tarik@tarik.fr", "azerty01", false),
//   new User("Marti" , "marti@marti.fr", "azerty01", false),
//   new User("Admin", "admin@admin.fr", "azerty01", true)
// ]

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'api/heroes'; // API URL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http:HttpClient ) {

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
    return this.http.post<User>(this.userUrl, user, this.httpOptions);
  }

  //PUT one user
  updateUser(user: User) {
    return this.http.put(this.userUrl, user, this.httpOptions);
  }
}
