import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userForm: FormGroup;
  email: FormControl;
  password: FormControl;

  static passwordMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const password2 = group.get('password2')?.value;
    return password === password2 ? null : {matchingError: true};
  }

  constructor(private fb: FormBuilder, public userService: UserService,public router: Router) {

    this.email = this.fb.control('', [Validators.required, Validators.email]);
    this.password = this.fb.control('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]);

    this.userForm = this.fb.group({
      email: this.email,
      password: this.password
    });

  }

  onSubmit():void {
    console.log("connexion");
    this.router.navigate(['home']);
  }
}
