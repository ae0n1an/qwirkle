import { Position } from "./position";
import { Observer } from "./observer/observer";
import { Subject } from "./observer/subject";

const INITIAL_BOARD_SIZE = 6;

export class Board implements Observer{
    private tokenBoard: Position[][]
    private selectedPosition?: Position

    constructor() {
        this.tokenBoard = []
        for (let i = 0; i < INITIAL_BOARD_SIZE; i++) {
            let row = []
            for (let j = 0; j < INITIAL_BOARD_SIZE; j++) {
                const position = new Position()
                row.push(position)
                position.attach(this)
            }
            this.tokenBoard.push(row)
        }
        this.selectedPosition = undefined
    }

    update(subject: Position): void {
        if (this.selectedPosition === subject) {
            this.selectedPosition.toggleHighlight()
            this.selectedPosition = undefined
        } else {
            if (this.selectedPosition !== undefined) {
                this.selectedPosition.toggleHighlight()
            }
            this.selectedPosition = subject
            this.selectedPosition.toggleHighlight()
        }
    }

    public getTokenBoard() {
        return this.tokenBoard
    }
}