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
        this.addNeighbours()
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

    private addNeighbours() {
        for (let i = 0; i < INITIAL_BOARD_SIZE; i++) {
            for (let j = 0; j < INITIAL_BOARD_SIZE; j++) {
                if (i-1 >= 0) {
                    this.tokenBoard[i][j].addNeighbour(this.tokenBoard[i-1][j])
                }
                if (i+1 < INITIAL_BOARD_SIZE) {
                    this.tokenBoard[i][j].addNeighbour(this.tokenBoard[i+1][j])
                }
                if (j-1 >= 0) {
                    this.tokenBoard[i][j].addNeighbour(this.tokenBoard[i][j-1])
                }
                if (j+1 < INITIAL_BOARD_SIZE) {
                    this.tokenBoard[i][j].addNeighbour(this.tokenBoard[i][j+1])
                }
            }
        }
    }

    public getTokenBoard() {
        return this.tokenBoard
    }
}