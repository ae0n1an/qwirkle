import { Board } from "./board";
import { Token } from "./token";
import { Position } from "./Position";

export class PlaceAction {
    private token: Token;
    private position: Position;

    constructor(token: Token, position: Position) {
        this.token =  token
        this.position = position
    }
}