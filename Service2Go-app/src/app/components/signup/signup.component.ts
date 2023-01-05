import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  passwordForm: FormGroup;
  userForm: FormGroup;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  password2: FormControl;

  static passwordMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const password2 = group.get('password2')?.value;
    return password === password2 ? null : {matchingError: true};
  }

  constructor(private fb: FormBuilder, public userService: UserService) {

    this.username = this.fb.control('', [Validators.required]);
    this.email = this.fb.control('', [Validators.required, Validators.email]);
    this.password = this.fb.control('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]);
    this.password2 = this.fb.control('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]);


    this.passwordForm = this.fb.group({
      password: this.password,
      password2 : this.password2
    }, {
      validators: [SignupComponent.passwordMatch],
      updateOn : 'blur'
    });

    this.userForm = this.fb.group({
      username: this.username,
      email: this.email,
      passwordForm : this.passwordForm
    });

  }

  addUser():void {
    const user = new User (this.username.value, this.email.value, this.password.value);
    this.userService.addUser(user);
    console.log(user);
  }

  onSubmit():void {
    this.addUser();
  }

  test():void {
    console.log("test")
    this.userService.save()
  }
}
