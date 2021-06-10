import { Inject, Injectable } from '@angular/core';
/* import { report } from 'process'; */

import { GamesDataService } from './games-data.service';
import { BROWSER_STORAGE } from './storage';
import { User } from './user';
import { AuthResponse } from './auth-response';

export class Credentials {
  username!: string;
  password!: string;
  name!: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private gamesDataService: GamesDataService,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  public saveToken(token: string) {
    this.storage.setItem('games-token', token);
  }
  public getToken(): string {
    return this.storage.getItem('games-token') as string;
  }

  public register(credentials: Credentials): Promise<any> {
    return this.gamesDataService
      .register(credentials)
      .then((response) => this.saveRegister(response))
      .catch(this.errorRegister);
  }

  private saveRegister(response: any) {
    console.log(response);
  }

  private errorRegister() {}

  public login(credentials: Credentials): Promise<any> {
    return this.gamesDataService
      .login(credentials)
      .then((response) => this.loginSuccess(response))
      .catch(this.errorLogin);
  }

  private loginSuccess(response: any) {
    console.log(response);
    if (response.success) {
      this.saveToken(response.token);
    }
  }

  private errorLogin() {}

  public logout(): void {
    this.storage.removeItem('games-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public saveLogin(response: any) {
    console.log(response);
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { name } = JSON.parse(atob(token.split('.')[1]));
      return { name } as User;
    }
    return {} as User;
  }
}
