import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  passwordForm: FormGroup;
  userForm: FormGroup;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  password2: FormControl;
  errorMessage: string;

  static passwordMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const password2 = group.get('password2')?.value;
    return password === password2 ? null : { matchingError: true };
  }

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public router: Router
  ) {
    this.username = this.fb.control('', [Validators.required]);
    this.email = this.fb.control('', [Validators.required, Validators.email]);
    this.password = this.fb.control('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]);
    this.password2 = this.fb.control('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]);

    this.passwordForm = this.fb.group(
      {
        password: this.password,
        password2: this.password2,
      },
      {
        validators: [SignupComponent.passwordMatch],
        updateOn: 'blur',
      }
    );

    this.userForm = this.fb.group({
      username: this.username,
      email: this.email,
      passwordForm: this.passwordForm,
    });

    this.errorMessage = '';
  }

  async onSubmit(userForm: FormGroup): Promise<void> {
    console.log('test');
    if (await this.checkEmailUniqueness(this.email)) {
      this.errorMessage = 'email déja utilisé !';
    } else {
      this.userService.addUser(userForm.value);
      this.router.navigate(['login']);
    }
  }

  async checkEmailUniqueness(control: FormControl) {
    let email = control.value;
    let users = await this.userService.getUsers().toPromise();

    console.log(users);
    if (users == null) {
      return null;
    } else {
      console.log(this.userService.checkEmailUniqueness(email, users));
      return this.userService.checkEmailUniqueness(email, users) ? true : false;
    }
  }
}
