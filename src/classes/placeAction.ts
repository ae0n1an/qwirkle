import { Board } from "./board";
import { Token } from "./token";
import { Position } from "./position";

export class PlaceAction {
    private token: Token;
    private position: Position;

    constructor(token: Token, position: Position) {
        this.token =  token
        this.position = position
    }

    public execute() {
        this.position.placeToken(this.token)
    }
}