import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeamsDataService } from '../teams-data-service.service';
import { Team } from '../teams-list/teams-list.component';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css'],
})
export class TeamDetailsComponent implements OnInit {
  teams: Team = {} as Team;

  constructor(
    private teamsDataService: TeamsDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const teamId: string = this.route.snapshot.params.teamId;
    this.getTeam(teamId);
  }

  private getTeam(teamId: string): void {
    this.teamsDataService
      .getTeam(teamId)
      .then((response) => this.gotATeam(this, response))
      .catch(this.handleError);
  }

  private gotATeam(teamDetailsComponent: TeamDetailsComponent, response: Team) {
    teamDetailsComponent.teams = response;
  }

  private handleError(error: any) {
    console.log(error);
  }
}
