import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Team } from './teams-list/teams-list.component';
import { Credentials } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class TeamsDataService {
  private baseURL: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public getTeams(): Promise<Team[]> {
    //1- Build URL
    const url: string = this.baseURL + '/teams';
    //2- Tell HTTP service to make a request
    //3- convert the observable to a promise
    //4- convert the response to JSON
    //5- Return the response
    //6- Catch and handle errors
    return this.http
      .get(url)
      .toPromise()
      .then(this.gotTeams)
      .catch(this.handleError);
  }
  private gotTeams(response: any): Team[] {
    return response as Team[];
  }

  private handleError(error: any): Team[] {
    console.log('Error ', error);
    return [];
  }

  public getTeam(teamId: string): Promise<Team> {
    const url: string = this.baseURL + '/teams/' + teamId;

    return this.http
      .get(url)
      .toPromise()
      .then(this.gotATeam)
      .catch(this.handleError2);
  }

  private gotATeam(response: any): Team {
    return response as Team;
  }

  private handleError2(error: any): Team {
    console.log('Error ', error);
    return {} as Team;
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
