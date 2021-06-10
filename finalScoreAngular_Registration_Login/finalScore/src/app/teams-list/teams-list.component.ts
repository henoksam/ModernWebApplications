import { Component, OnInit } from '@angular/core';

import { TeamsDataService } from '../teams-data-service.service';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';

export class Team {
  _id: number = 1;
  title: string = '';
  price: number = 0;
}

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css'],
})
export class TeamsListComponent implements OnInit {
  title: string = 'Mean Teams';
  name: string = '';

  teams: Team[] = [];

  constructor(
    private teamsDataService: TeamsDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getTeams();
    const user: User = this.authenticationService.getCurrentUser();
  }

  private getTeams(): void {
    this.teamsDataService
      .getTeams()
      .then((response) => this.gotTeams(this, response))
      .catch(this.handleError);
  }
  private gotTeams(teamsListComponent: TeamsListComponent, response: Team[]) {
    teamsListComponent.teams = response;
  }

  private handleError(error: any) {
    console.log(error);
  }
}
