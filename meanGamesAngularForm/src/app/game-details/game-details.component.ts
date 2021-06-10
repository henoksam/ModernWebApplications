import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GamesDataService } from '../games-data.service';
import { Game } from '../games-list/games-list.component';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  games: Game = {} as Game;

  constructor(
    private gamesDataService: GamesDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const gameId: string = this.route.snapshot.params.gameId;
    this.getGame(gameId);
  }

  private getGame(gameId: string): void {
    this.gamesDataService
      .getGame(gameId)
      .then((response) => this.gotAGame(this, response))
      .catch(this.handleError);
  }

  private gotAGame(gameDetailsComponent: GameDetailsComponent, response: Game) {
    gameDetailsComponent.games = response;
  }

  private handleError(error: any) {
    console.log(error);
  }
}
