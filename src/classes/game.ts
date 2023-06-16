import { Board } from "./board.js";
import { Player } from "./player.js";
import { Token } from "./token.js";

export class Game {
  private board: Board;
  private players: Player[];
  private unplaced_tokens: Token[];

  constructor() {
    this.board = new Board();
    this.players = [];
    this.unplaced_tokens = []

  }
}