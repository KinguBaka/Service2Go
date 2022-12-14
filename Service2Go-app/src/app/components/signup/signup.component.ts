import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  userForm: FormGroup;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  password2: FormControl;


  constructor(private fb: FormBuilder, public userService: UserService) {

    this.username = this.fb.control('', [Validators.required]);
    this.email = this.fb.control('', [Validators.required, Validators.email]);
    this.password = this.fb.control('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]);
    this.password2 = this.fb.control('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]);

    this.userForm = this.fb.group({
      username: this.username,
      email: this.email,
      password: this.password,
      password2 : this.password2
    });
  }
}
