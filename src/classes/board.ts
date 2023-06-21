import { Position } from "./position";
import { Observer } from "./observer/observer";
import { Subject } from "./observer/subject";

const INITIAL_BOARD_SIZE = 6;

export class Board implements Observer{
    private tokenBoard: Position[][][]
    private selectedPosition?: Position

    constructor() {
        this.tokenBoard = [[]]
        for (let i = 0; i < INITIAL_BOARD_SIZE; i++) {
            let row = []
            for (let j = 0; j < INITIAL_BOARD_SIZE; j++) {
                const position = new Position()
                row.push(position)
                position.attach(this)
            }
            this.tokenBoard[0].push(row)
        }
        this.addNeighbours()
        this.selectedPosition = undefined
    }

    update(subject: Position): void {
        this.growBoard()
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
                    this.tokenBoard[0][i][j].addNeighbour(this.tokenBoard[0][i-1][j])
                }
                if (i+1 < INITIAL_BOARD_SIZE) {
                    this.tokenBoard[0][i][j].addNeighbour(this.tokenBoard[0][i+1][j])
                }
                if (j-1 >= 0) {
                    this.tokenBoard[0][i][j].addNeighbour(this.tokenBoard[0][i][j-1])
                }
                if (j+1 < INITIAL_BOARD_SIZE) {
                    this.tokenBoard[0][i][j].addNeighbour(this.tokenBoard[0][i][j+1])
                }
            }
        }
    }

    private growBoard() {
        // add left and right columns to the board updating their neighbours
        for (let i = 0; i < this.tokenBoard[0].length; i++) {
            this.tokenBoard[0][i] = [new Position(), ...this.tokenBoard[0][i], new Position()]
            this.tokenBoard[0][i][0].addNeighbour(this.tokenBoard[0][i][1])
            this.tokenBoard[0][i][1].addNeighbour(this.tokenBoard[0][i][0])
            this.tokenBoard[0][i][0].attach(this)
            this.tokenBoard[0][i][this.tokenBoard[0].length].addNeighbour(this.tokenBoard[0][i][this.tokenBoard[0].length+1])
            this.tokenBoard[0][i][this.tokenBoard[0].length+1].addNeighbour(this.tokenBoard[0][i][this.tokenBoard[0].length])
            this.tokenBoard[0][i][this.tokenBoard[0].length+1].attach(this)
        }

        let start_row = []
        let end_row = []

        for (let i = 0; i < this.tokenBoard[0].length + 2; i++) { // add start and end rows to the token board updating their neighbours
            start_row.push(new Position())
            start_row[i].attach(this)
            start_row[i].addNeighbour(this.tokenBoard[0][0][i])
            this.tokenBoard[0][0][i].addNeighbour(start_row[i])
            end_row.push(new Position())
            end_row[i].attach(this)
            end_row[i].addNeighbour(this.tokenBoard[0][this.tokenBoard.length-1][i])
            this.tokenBoard[0][this.tokenBoard[0].length-1][i].addNeighbour(end_row[i])
        }
        this.tokenBoard[0] = [start_row, ...this.tokenBoard[0], end_row]
    }

    public getTokenBoard() {
        return this.tokenBoard
    }
}