import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup
  submitted = false

  constructor(  public authentication : AuthenticationService,
                private router: Router ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(7)])
    })
  }

  submit() {
    if(this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,   
      returnSecureToken: true
    }

    this.authentication.login(user).subscribe(res => {
      this.form.reset
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false  
    }, () => {
      this.submitted = false;
    })
  }
}
