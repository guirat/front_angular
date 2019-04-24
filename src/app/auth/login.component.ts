import { Component } from '@angular/core';
import { AuthService} from './auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  hide = true;
  public emailAndPasswordValid = true;
  // user: User = new User();
  public user = { email: '', password: '', username: '',
    first_name: '', last_name: '', tagline: '',
    avatar: '', created_at: '', updated_at: '', is_admin: '',
    is_active: '', is_staff: ''};


  constructor(private router: Router, private auth: AuthService) { }

  onLogin(): void {
   this.auth.login(this.user)
   .then((user) => {
     localStorage.setItem('token', user.json().auth_token);
     localStorage.setItem('user', JSON.stringify(user.json().user));
     this.router.navigateByUrl('/status');
     console.log('user');
     console.log(localStorage.getItem('user'));

     this.emailAndPasswordValid = true;
   })
   .catch((err) => {
     console.log(err);
     this.emailAndPasswordValid = false;
     console.log(this.emailAndPasswordValid);


   });
 }

 goHome= function () {
       this.router.navigateByUrl('');
     }


   emailFormControl = new FormControl('', [
     Validators.required,
     Validators.email,
   ]);

   matcher = new MyErrorStateMatcher();

}
