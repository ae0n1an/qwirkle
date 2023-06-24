import { Board } from "./board";
import { Player } from "./player";
import { Token } from "./token";
import { Subject } from "./observer/subject";
import { PlaceAction } from "./placeAction";

const COLORS = ["red", "blue", "green", "orange", "purple", "yellow"];
const SHAPES = ["square", "circle", "triangle", "diamond", "four_point_star", "six_point_star"];
const NUMBER_OF_EACH_TOKEN = 3;
const NUMBER_OF_PLAYERS = 2;
const NUMBER_OF_TOKENS_PER_PLAYER = 6;

export class Game{
    private board: Board;
    private active_player: Player;
    private players: Player[];
    private unplaced_tokens: Token[];
    private action_stack: PlaceAction[];

    constructor() {
        this.board = new Board();
        this.unplaced_tokens = [];
        this.generate_tokens();
        this.players = [];
        this.generate_players();
        this.active_player = this.players[0];
        this.action_stack = [];
    }

    private generate_tokens() {
        for (let k = 0; k < NUMBER_OF_EACH_TOKEN; k++) {
            for (let i = 0; i < COLORS.length; i++) {
                for (let j = 0; j < SHAPES.length; j++) {
                    this.unplaced_tokens.push(new Token(COLORS[i], SHAPES[j]!))
                }
            }
        }
        this.shuffle_tokens()
    }

    private shuffle_tokens() {
        let currentIndex = this.unplaced_tokens.length;
        let randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          let temp_token = this.unplaced_tokens[currentIndex]
          this.unplaced_tokens[currentIndex] = this.unplaced_tokens[randomIndex]!
          this.unplaced_tokens[randomIndex] = temp_token!
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

    public undoMove() {
        if (this.action_stack.length > 0) {
            let previous_action = this.action_stack.pop()
            previous_action?.revert()
        }
    }

    public undoAllMoves() {
        while (this.action_stack.length > 0) {
            let previous_action = this.action_stack.pop()
            previous_action?.revert()
        }
    }

    public getBoard() {
        return this.board
    }

    public getActivePlayer() {
        return this.active_player
    }

    public update(): void {
        let selectedPosition = this.board.getSelectedPosition()
        let selectedToken = this.active_player.getSelectedToken()
        if (selectedPosition !== undefined && selectedPosition.getToken() !== undefined) {
            this.board.removeSelectedPosition()
        } else if (selectedPosition !== undefined && selectedToken !== undefined) {
            let token_index = this.removeSelected()
            let placeAction = new PlaceAction(this.active_player, selectedToken, selectedPosition, token_index)
            this.action_stack.push(placeAction)
            placeAction.execute()
        }
    }

    private removeSelected() : number { // returns the index of the previous token in the player
        this.board.removeSelectedPosition()
        return this.active_player.removeSelectedToken()
    }
}