import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment'
import { InMemoryDataService } from './in-memory-data.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth: boolean;

  constructor(
    public router: Router,
    private inMememoryDataService: InMemoryDataService
  ) {
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
    this.router.navigate(['home']);
  }

  logout() {
    this.isAuth = false;
    this.inMememoryDataService.clearData();
    this.router.navigate(['login']);
  }
}
