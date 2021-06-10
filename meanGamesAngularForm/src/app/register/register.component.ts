import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, Credentials } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  message: string = '';
  err: string = '';
  name: string = '';
  username: string = '';
  password: string = '';
  passwordRepeat: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public register(): void {
    if (
      !this.username ||
      !this.password ||
      !this.passwordRepeat ||
      !this.name
    ) {
      this.err = 'Must enter all fields';
    } else {
      if (this.password !== this.passwordRepeat) {
        this.err = 'Passwords must match';
      } else {
        this.doRegister();
      }
    }
  }

  private doRegister() {
    this.err = '';
    const credentials: Credentials = {
      username: this.username,
      password: this.password,
      name: this.name,
    };

    this.authenticationService
      .register(credentials)
      .then((response) => this.registerDone(response))
      .catch(this.registerError);
  }
  private registerDone(response: any) {
    console.log("We've registered");
    this.router.navigate(['/games']);
    //this.location.path("")
  }

  private registerError(error: string) {
    this.err = error;
  }
}
