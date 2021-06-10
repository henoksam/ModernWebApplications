import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Game } from './games-list/games-list.component';
import { Credentials } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class GamesDataService {
  private baseURL: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public getGames(): Promise<Game[]> {
    //1- Build URL
    const url: string = this.baseURL + '/games';
    //2- Tell HTTP service to make a request
    //3- convert the observable to a promise
    //4- convert the response to JSON
    //5- Return the response
    //6- Catch and handle errors
    return this.http
      .get(url)
      .toPromise()
      .then(this.gotGames)
      .catch(this.handleError);
  }
  private gotGames(response: any): Game[] {
    return response as Game[];
  }

  private handleError(error: any): Game[] {
    console.log('Error ', error);
    return [];
  }

  public getGame(gameId: string): Promise<Game> {
    const url: string = this.baseURL + '/games/' + gameId;

    return this.http
      .get(url)
      .toPromise()
      .then(this.gotAGame)
      .catch(this.handleError2);
  }

  private gotAGame(response: any): Game {
    return response as Game;
  }

  private handleError2(error: any): Game {
    console.log('Error ', error);
    return {} as Game;
  }

  public register(credentials: Credentials): Promise<unknown> {
    //1- Build URL
    const url: string = this.baseURL + '/users';
    //2- Tell HTTP service to make a request
    //3- convert the observable to a promise
    //4- convert the response to JSON
    //5- Return the response
    //6- Catch and handle errors
    return this.http
      .post(url, credentials)
      .toPromise()
      .then(this.gotRegister)
      .catch(this.handleRegisterError);
  }

  private handleRegisterError(error: any) {
    console.log('Error ', error);
    return {};
  }

  private gotRegister(response: any) {
    console.log('Service Response');
    console.log(response);
    return response;
  }

  public login(credentials: Credentials): Promise<unknown> {
    //1- Build URL
    const url: string = this.baseURL + '/auth/';
    //2- Tell HTTP service to make a request
    //3- convert the observable to a promise
    //4- convert the response to JSON
    //5- Return the response
    //6- Catch and handle errors
    return this.http
      .post(url, credentials)
      .toPromise()
      .then(this.gotLogin)
      .catch(this.handleLoginError);
  }
  private gotLogin(response: any) {
    return response;
  }

  private handleLoginError(error: any) {
    console.log('Error ', error);
    return {};
  }
}
