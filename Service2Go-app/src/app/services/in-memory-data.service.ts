import { Inject, Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SERVICES } from '../bdd/mock-services';
import { USERS } from '../bdd/mock-users';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  constructor() {}

  createDb() {
    let services = SERVICES;
    let users = USERS;
    return { services, users };
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string):any {
    return localStorage.getItem(key);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
