import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth: boolean;

  constructor(public router: Router) {
    this.isAuth = false;
  }

  encrypPassword(password: any): any {
    const encryptedPassword = CryptoJS.HmacSHA256(
      password,
      environment.secretKey
    );
    const hashString = encryptedPassword.toString(CryptoJS.enc.Base64);
    return hashString;
  }

  login() {
    this.isAuth = true;
    this.router.navigate(['']);
  }

  logout() {
    this.isAuth = false;
    this.router.navigate(['login']);
  }
}
