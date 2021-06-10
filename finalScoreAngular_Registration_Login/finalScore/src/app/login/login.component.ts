import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, Credentials } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public err: string = '';
  public message: string = '';
  public username: string = '';
  public password: string = '';
  public name: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.name = this.authenticationService.getCurrentUser().name;
    }
  }

  public login(): void {
    if (!this.username || !this.password) {
      this.err = 'Please provide username and password';
    } else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    const credentials: Credentials = {
      username: this.username,
      password: this.password,
      name: '',
    };
    this.authenticationService
      .login(credentials)
      .then((response) => this.loginSuccess(response))
      .catch();
  }

  private loginSuccess(response: any) {
    this.router.navigate(['/']);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
