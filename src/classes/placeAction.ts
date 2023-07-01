import { Board } from "./board";
import { Token } from "./token";
import { Position } from "./position";
import { Player } from "./player";

export class PlaceAction {
    private player: Player;
    private prev_token_index: number;
    private token: Token;
    private position: Position;
    private board: Board;

    constructor(player: Player, token: Token, position: Position, prev_token_index: number, board: Board) {
        this.player = player
        this.token =  token
        this.position = position
        this.prev_token_index = prev_token_index
        this.board = board
    }

    public execute() {
        this.position.placeToken(this.token)
        this.board.addUpdatedPosition(this.position)
    }

    public revert() {
        this.player.insertToken(this.prev_token_index, this.token)
        this.board.removeUpdatedPosition(this.position)
        this.position.removeToken()
    }
}