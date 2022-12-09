import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth:boolean;

  constructor(public router: Router) {
    this.isAuth = false;

  }

  login() {
    this.isAuth = true;
    this.router.navigate([""])
  }

  logout() {
    this.isAuth = false;
    this.router.navigate([""])
  }
}
