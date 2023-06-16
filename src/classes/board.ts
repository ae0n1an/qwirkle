import { Token } from "./token"

const INITIAL_BOARD_SIZE = 12;

export class Board {
    private board: Token[][]
    constructor() {
        this.board = []
        for (let i = 0; i < INITIAL_BOARD_SIZE; i++) {
            let row = []
            for (let j = 0; j < INITIAL_BOARD_SIZE; j++) {
                row.push(new Token("none", "empty"))
            }
        }
    }
}