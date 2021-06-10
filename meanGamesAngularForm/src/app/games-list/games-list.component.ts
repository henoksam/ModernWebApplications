import { Component, OnInit } from '@angular/core';

import { GamesDataService } from '../games-data.service';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';

export class Game {
  _id: number = 1;
  title: string = '';
  price: number = 0;
}

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  title: string = 'Mean Games';
  name: string = '';
  /*   game1: Game = {
    _id: 123,
    title: 'Game One',
    price: 10.99,
  };
  game2: Game = {
    _id: 125,
    title: 'Game One',
    price: 10.99,
  }; */
  games: Game[] = [];

  constructor(
    private gamesDataService: GamesDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getGames();
    const user: User = this.authenticationService.getCurrentUser();
  }

  private getGames(): void {
    this.gamesDataService
      .getGames()
      .then((response) => this.gotGames(this, response))
      .catch(this.handleError);
  }
  private gotGames(gamesListComponent: GamesListComponent, response: Game[]) {
    gamesListComponent.games = response;
  }

  private handleError(error: any) {
    console.log(error);
  }
}
