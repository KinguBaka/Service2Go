import { Injectable } from '@angular/core';
import { User } from '../class/user';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { InMemoryDataService } from './in-memory-data.service';

const innitialUser: User[] = [

  {
    "id" : 0,
    "username" : 'Tarik',
    "email" :'tarik@tarik.fr',
    "password" : '4FSLhNVsosCMw20e7PEDKk9/LDuE5Mt8jkZWxkiJ/6A=',
    "isAdmin" : false
  }
  ,
  {
    "id" : 1,
    "username" : 'Marti',
    "email" :'marti@marti.fr',
    "password" : '4FSLhNVsosCMw20e7PEDKk9/LDuE5Mt8jkZWxkiJ/6A=',
    "isAdmin" : false
  }
  ,{
    "id" : 2,
    "username" : 'Admin',
    "email" :'admin@admin.fr',
    "password" : '4FSLhNVsosCMw20e7PEDKk9/LDuE5Mt8jkZWxkiJ/6A=',
    "isAdmin" : true
  }
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

  constructor(private http: HttpClient, private authService : AuthService, private inMemoryDataService : InMemoryDataService) {}

  save(listOfUser: User[]): void {
    this.http.put(url + '/user.json', listOfUser).subscribe();
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
  addUser(user : any): void {
    this.http
      .get<User[]>(url + '/user.json')
      .pipe(
        tap((users) => console.log('appel ok')),
        map((users) => {
          if (!users || users.length == 0) {
            users = [];
          }
          let newUser = new User(
            this.checkId(users),
            user.username,
            user.email,
            this.authService.encrypPassword(user.passwordForm.password)
          );
          users.push(newUser);
          this.save(users);
        }),
        catchError((error) => {
          console.error("Erreur sur l'appel addUser", error);
          return [];
        })
      )
      .subscribe();
  }

  //PUT one user
  updateUser(user: User) {
    return this.http.put(this.userUrl, user, this.httpOptions);
  }

  // Check for givin last id
  checkId(array: Array<any>): number {
    if (array.length > 0) {
      return Math.max(...array.map((user) => user.id)) + 1;
    } else {
      return 0;
    }
  }

  // Check email is unique
  checkEmailUniqueness(email: string, users: Array<User>): boolean {
    for (let user of users) {
      if (user.email == email) {
        return true;
      }
    }
    return false;
  }
}
