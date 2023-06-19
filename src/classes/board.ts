import { Position } from "./Position";

const INITIAL_BOARD_SIZE = 12;

export class Board {
    private tokenBoard: Position[][]

    constructor() {
        this.tokenBoard = []
        for (let i = 0; i < INITIAL_BOARD_SIZE; i++) {
            let row = []
            for (let j = 0; j < INITIAL_BOARD_SIZE; j++) {
                row.push(new Position())
            }
            this.tokenBoard.push(row)
        }
        
    }

    public getTokenBoard() {
        return this.tokenBoard
    }
}