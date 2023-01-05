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
    const encryptedPassword = CryptoJS.AES.encrypt(password, environment.secretKey);
    return encryptedPassword;
  }

  decryptPasswrod(encryptPassword: any): string {
    const bytes = CryptoJS.AES.decrypt(
      encryptPassword.toString(),
      environment.secretKey
    );
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedPassword;
  }

  login() {
    this.isAuth = true;
    this.router.navigate(['']);
  }

  logout() {
    this.isAuth = false;
    this.router.navigate(['']);
  }
}
