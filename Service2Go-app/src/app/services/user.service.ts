import { Injectable } from '@angular/core';
import { User } from '../class/user';

const innitialUser: User[] = [
  new User("Tarik A","tarik@tarik.fr", "azerty01", false),
  new User("Marti" , "marti@marti.fr", "azerty01", false),
  new User("Admin", "admin@admin.fr", "azerty01", true)
]

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
}
