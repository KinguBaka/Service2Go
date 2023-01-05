import { Injectable } from '@angular/core';
import { User } from '../class/user';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

const innitialUser: User[] = [
  new User(
    'Tarik A',
    'tarik@tarik.fr',
    '4FSLhNVsosCMw20e7PEDKk9/LDuE5Mt8jkZWxkiJ/6A='
  ),
  new User(
    'Marti',
    'marti@marti.fr',
    '4FSLhNVsosCMw20e7PEDKk9/LDuE5Mt8jkZWxkiJ/6A='
  ),
  new User(
    'Admin',
    'admin@admin.fr',
    '4FSLhNVsosCMw20e7PEDKk9/LDuE5Mt8jkZWxkiJ/6A='
  ),
];

const url = "https://service2go-4dc96-default-rtdb.europe-west1.firebasedatabase.app"

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'api/users'; // API URL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  save(): void {
    this.http.put(url + '/user.json', innitialUser).subscribe();
  }

  // GET all services
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(url + '/user.json').pipe(
      tap((users) => console.log('appel ok')),
      map((users) => {
        return users;
      }),
      catchError((error) => {
        console.error("Erreur sur l'appel getServices", error);
        return [];
      })
    );
  }

  // GET one user by his id
  getUserById(id: number): Observable<User | any> {
    return this.http.get<User[]>(url + '/user.json').pipe(
      tap((users) => console.log('appel ok')),
      map((users) => {
        for (let user of users) {
          if (user.id === id) {
            return user;
          }
        }
        console.log('user introuvable dans la bdd!');
        return null;
      }),
      catchError((error) => {
        console.error("Erreur sur l'appel getServices", error);
        return [];
      })
    );
  }

  // GET one user by his email
  getUser(email: string): Observable<User | any> {
    return this.http.get<User[]>(url + '/user.json').pipe(
      tap((users) => console.log('appel ok')),
      map((users) => {
        for (let user of users) {
          if (user.email === email) {
            return user;
          }
        }
        console.log('user introuvable dans la bdd!');
        return null;
      }),
      catchError((error) => {
        console.error("Erreur sur l'appel getServices", error);
        return [];
      })
    );
  }

  // POST one user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions).pipe(
      tap((user) => console.log('user creer')),
      map((user) => {
        return user;
      }),
      catchError((error) => {
        console.error("Erreur sur l'appel getServices", error);
        return [];
      })
    );
  }

  //PUT one user
  updateUser(user: User) {
    return this.http.put(this.userUrl, user, this.httpOptions);
  }

  checkId(array: Array<any>): number {
    if (array.length > 0) {
      return Math.max(...array.map((user) => user.id)) + 1;
    } else {
      return 0;
    }
  }
}
