import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InMemoryDataService } from 'src/app/services/in-memory-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  userForm: FormGroup;
  email: FormControl;
  password: FormControl;
  errorMessage: string;

  constructor(private fb: FormBuilder, public userService: UserService,public router: Router, private authService : AuthService,
    private inMememoryDataService : InMemoryDataService ) {

    this.email = this.fb.control('', [Validators.required, Validators.email]);
    this.password = this.fb.control('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]);

    this.userForm = this.fb.group({
      email: this.email,
      password: this.password
    });

    this.errorMessage = "";

  }

  async onSubmit(userForm: FormGroup):Promise<void> {
    console.log(userForm.value)
    let passwordMatching;
    let userConnected = await this.userService
      .getUser(userForm.value.email)
      .toPromise();


    if (userConnected == null) {

      this.errorMessage = "L'utilisateur n'existe pas ! "
    } else {

      if (userConnected.password === this.authService.encrypPassword(userForm.value.password)) {
        console.log('The password is valid');
        passwordMatching = true;
      } else {
        console.log('The password is invalid');
        passwordMatching = false;
      }

      if (passwordMatching === true) {
        console.log('connexion');
        this.inMememoryDataService.saveData('id', userConnected.id);
        this.authService.login()
      } else {
        this.errorMessage = 'Mot de passe incorrect ! ';
      }
    }
  }
}
