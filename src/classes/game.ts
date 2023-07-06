import { Board } from "./board";
import { Player } from "./player";
import { Token } from "./token";
import { Subject } from "./observer/subject";
import { PlaceAction } from "./placeAction";

const COLORS = ["red", "blue", "green", "orange", "purple", "yellow"];
const SHAPES = ["square", "circle", "triangle", "diamond", "four_point_star", "six_point_star"];
const NUMBER_OF_EACH_TOKEN = 3;
//const NUMBER_OF_PLAYERS = 3;
const NUMBER_OF_TOKENS_PER_PLAYER = 6;

export class Game{
    private board: Board;
    private active_player: Player;
    private players: Player[];
    private unplaced_tokens: Token[];
    private action_stack: PlaceAction[];
    private status_display: string;

    constructor(number_of_players: number) {
        this.board = new Board();
        this.unplaced_tokens = [];
        this.generate_tokens();
        this.players = [];
        this.generate_players(number_of_players);
        this.active_player = this.players[0];
        this.action_stack = [];
        this.status_display = this.active_player.getName() + "'s turn";
    }

    public getPlayers() {
        return this.players
    }

    public getRemainingTokenCount(): number {
        return this.unplaced_tokens.length
    }

    public getStatus() : string{
        return this.status_display
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

    private generate_players(number_of_players: number) {
        for (let i = 0; i < number_of_players; i++) {
            let tokens: Token[] = []
            for (let j = 0; j < NUMBER_OF_TOKENS_PER_PLAYER; j++) {
                tokens.push(this.unplaced_tokens.pop()!)
            }
            this.players.push(new Player(tokens, "Player " + (i+1).toString()))
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

    public reshuffleHand() {
        this.undoAllMoves()
        let current_tokens = this.active_player.getTokens()
        while (current_tokens.length !== 0) { // remove each token and randomly place back in the unplaced_tokens pile
            let removed_token = current_tokens.pop()!
            this.addTokenBack(removed_token)
            removed_token.detach(this.active_player) // remove the player from observing the token
        }
        this.nextPlayer()
    }

    public confirmTurn() {
        let validate_board = this.board.validateBoard()
        if (validate_board[0]) {
            this.active_player.updateScore(validate_board[1])
            this.board.increaseBoard()
            this.nextPlayer()
        } else {
            this.undoAllMoves()
        }
    }

    private addTokenBack(token: Token) {
        this.unplaced_tokens.splice(Math.floor(Math.random()*this.unplaced_tokens.length), 0, token);
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
            let placeAction = new PlaceAction(this.active_player, selectedToken, selectedPosition, token_index, this.board)
            this.action_stack.push(placeAction)
            placeAction.execute()
        }
    }

    private removeSelected() : number { // returns the index of the previous token in the player
        this.board.removeSelectedPosition()
        return this.active_player.removeSelectedToken()
    }

    private nextPlayer() {
        this.removeSelected()
        // add tokens to the player that just had their turn
        for (let j = this.active_player.getNumberOfTokens(); j < NUMBER_OF_TOKENS_PER_PLAYER && this.unplaced_tokens.length !== 0; j++) {
            this.active_player.addToken(this.unplaced_tokens.pop()!) // take the tokens from the unplaced_tokens pile
        }
        if (this.active_player.getNumberOfTokens() === 0) {
            this.active_player.updateScore(6)
            this.gameOver()
        } else {
            let next_player_index = (this.players.indexOf(this.active_player) + 1) % this.players.length;
            this.active_player = this.players[next_player_index]
            this.action_stack = []
            this.status_display = this.active_player.getName() + "'s turn";
        }
    }

    private gameOver() {
        let largest_score = this.players[0].getScore()
        let winner_index = 0
        for (let i = 1; i < this.players.length; i++) {
            if (largest_score < this.players[i].getScore()) {
                winner_index = i
                largest_score = this.players[i].getScore()
            }
        }
        this.status_display = this.players[winner_index].getName() + " wins"
    }
}