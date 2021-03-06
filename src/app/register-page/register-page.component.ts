import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { MatSnackBar} from '@angular/material';
import {FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerUserData = {};

  constructor(private auth: AuthService, private snackbar: MatSnackBar, private router: Router) { }

  hide = true;

  // tslint:disable-next-line: member-ordering
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {

  }

  register() {
    this.auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res);
        this.snackbar.open(res.message, '', {
          duration: 2000,
          panelClass: ['green-snackbar']
        });
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
