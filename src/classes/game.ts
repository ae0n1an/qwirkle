import { Board } from "./board.js";
import { Player } from "./player.js";
import { Token } from "./token.js";

const COLORS = ["red", "blue", "green", "orange", "purple", "yellow"];
const SHAPES = ["square", "circle", "triangle", "diamond", "four_point_star", "six_point_star"];
const NUMBER_OF_EACH_TOKEN = 3;
const NUMBER_OF_PLAYERS = 2;
const NUMBER_OF_TOKENS_PER_PLAYER = 6;

export class Game {
    private board: Board;
    private players: Player[];
    private unplaced_tokens: Token[];

    constructor() {
        this.board = new Board();
        this.unplaced_tokens = [];
        this.generate_tokens();
        this.players = [];
        this.generate_players();
    }

    private generate_tokens() {
        for (let k = 0; k < NUMBER_OF_EACH_TOKEN; k++) {
            for (let i = 0; i < COLORS.length; i++) {
                for (let j = 0; j < SHAPES.length; j++) {
                    this.unplaced_tokens.push(new Token(COLORS[i], SHAPES[j]))
                }
            }
        }
        this.shuffle_tokens()
    }

    private shuffle_tokens() {
        let currentIndex = this.unplaced_tokens.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [this.unplaced_tokens[currentIndex], this.unplaced_tokens[randomIndex]] = [
            this.unplaced_tokens[randomIndex], this.unplaced_tokens[currentIndex]];
        }
    }

    private generate_players() {
        for (let i = 0; i < NUMBER_OF_PLAYERS; i++) {
            let tokens: Token[] = []
            for (let j = 0; j < NUMBER_OF_TOKENS_PER_PLAYER; j++) {
                tokens.push(this.unplaced_tokens.pop()!)
            }
            this.players.push(new Player(tokens))
        }
    }
}