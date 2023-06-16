import { Board } from "./board.js";
import { Player } from "./player.js";
import { Token } from "./token.js";

const COLORS = ["red", "blue", "green", "orange", "purple", "yellow"];
const SHAPES = ["square", "circle", "triangle", "diamond", "four_point_star", "six_point_star"];
const NUMBER_OF_EACH_TOKEN = 3;

export class Game {
    private board: Board;
    private players: Player[];
    private unplaced_tokens: Token[];

    constructor() {
        this.board = new Board();
        this.unplaced_tokens = []
        this.generate_tokens
        this.players = [];
    }

    private generate_tokens() {
        for (let k = 0; k < NUMBER_OF_EACH_TOKEN; k++) {
            for (let i = 0; i < COLORS.length; i++) {
                for (let j = 0; j < SHAPES.length; j++) {
                    this.unplaced_tokens.push(new Token(COLORS[i], SHAPES[j]))
                }
            }
        }
    } 
}