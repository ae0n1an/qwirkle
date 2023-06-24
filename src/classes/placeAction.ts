import { Board } from "./board";
import { Token } from "./token";
import { Position } from "./position";
import { Player } from "./player";

export class PlaceAction {
    private player: Player;
    private prev_token_index: number;
    private token: Token;
    private position: Position;

    constructor(player: Player, token: Token, position: Position, prev_token_index: number) {
        this.player = player
        this.token =  token
        this.position = position
        this.prev_token_index = prev_token_index
    }

    public execute() {
        this.position.placeToken(this.token)
    }

    public revert() {
        this.player.insertToken(this.prev_token_index, this.token)
        this.position.removeToken()
    }
}