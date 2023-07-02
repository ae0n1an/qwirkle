import { Position } from "./position";
import { Observer } from "./observer/observer";
import { Subject } from "./observer/subject";
import { Game } from "./game";

const INITIAL_BOARD_SIZE = 6;

export class Board implements Observer{
    private tokenBoard: Position[][][]
    private selectedPosition?: Position
    private updatedPositions: Position[]
    private boardEmpty: boolean

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
        this.updatedPositions = []
        this.boardEmpty = true
    }

    public addUpdatedPosition(position: Position) {
        this.updatedPositions.push(position)
    }

    public removeUpdatedPosition(position: Position) {
        const positionIndex = this.updatedPositions.indexOf(position);
        if (positionIndex === -1) {
            return console.log('Subject: Nonexistent position.')
        }
        this.updatedPositions.splice(positionIndex, 1);
    }

    private clearUpdatedPositions() {
        this.updatedPositions = []
    }

    update(subject: Position): void {
        if (this.selectedPosition === subject) {
            this.selectedPosition = undefined
        } else {
            this.selectedPosition = subject
        }
    }

    public validateBoard() : boolean {
        let valid_row, valid_col
        let tiles_placed_continuously = false
        let tiles_connected = this.boardEmpty // if the board is empty then if the play is valid it will be connected
        if (this.updatedPositions.length === 0) {
            return false
        }
        for (let i = 0; i < this.tokenBoard[0].length; i++) {
            valid_row = this.validateRow(i)
            valid_col = this.validateColumn(i)
            if (!valid_row[0] || !valid_col[0]) {
                return false
            }
            if (valid_row[1] === this.updatedPositions.length || valid_col[1] === this.updatedPositions.length) {
                tiles_placed_continuously = true
            }
            if (valid_row[2] || valid_col[2]) {
                tiles_connected = true
            }
        }
        if (tiles_placed_continuously && tiles_connected) {
            this.clearUpdatedPositions()
            this.boardEmpty = false 
            return true
        } else {
            return false
        }
    }

    private validateColumn(i: number) : [boolean, number, boolean] {
        let currentToken = undefined
        let prevToken = undefined
        let shape = undefined
        let colour = undefined
        let current_tokens: string[] = []
        let token_sequence = 0
        let placed_tokens = 0
        let connected = false
        let valid_shape = true
        let valid_colour = true
        let placed_tokens_count = 0

        for (let j = 0; j < this.tokenBoard[0].length; j++) {
            currentToken = this.tokenBoard[0][j][i].getToken()
            if (currentToken !== undefined) {
                if (prevToken === undefined) {
                    shape = currentToken.getShape()
                    colour = currentToken.getColour()
                    valid_shape = true
                    valid_colour = true
                    current_tokens = [currentToken.getShape() + currentToken.getColour()]
                    if (this.updatedPositions.includes(this.tokenBoard[0][j][i])) {
                        placed_tokens = 1
                    } else {
                        placed_tokens = 0
                    }
                    token_sequence = 1
                } else {
                    token_sequence += 1
                    if (this.updatedPositions.includes(this.tokenBoard[0][j][i])) {
                        placed_tokens += 1
                    }
                    if (valid_shape && currentToken.getShape() !== shape) {
                        valid_shape = false
                    }
                    if (valid_colour && currentToken.getColour() !== colour) {
                        valid_colour = false
                    }
                    if (current_tokens.includes(currentToken.getShape() + currentToken.getColour()) || (!valid_colour && !valid_shape)) {
                        return [false, -1, false]
                    }
                    current_tokens.push(currentToken.getShape() + currentToken.getColour())
                }
            } else {
                if (placed_tokens < token_sequence && placed_tokens > 0) {
                    connected = true
                }
                placed_tokens_count = Math.max(placed_tokens_count, placed_tokens)
            }
            prevToken = currentToken
        }
        placed_tokens_count = Math.max(placed_tokens_count, placed_tokens)
        return [true, placed_tokens_count, connected]
    }

    private validateRow(i: number) : [boolean, number, boolean] {
        let currentToken = undefined
        let prevToken = undefined
        let shape = undefined
        let colour = undefined
        let current_tokens: string[] = []
        let token_sequence = 0
        let placed_tokens = 0
        let connected = false
        let valid_shape = true
        let valid_colour = true
        let placed_tokens_count = 0

        for (let j = 0; j < this.tokenBoard[0].length; j++) {
            currentToken = this.tokenBoard[0][i][j].getToken()
            if (currentToken !== undefined) {
                if (prevToken === undefined) {
                    shape = currentToken.getShape()
                    colour = currentToken.getColour()
                    valid_shape = true
                    valid_colour = true
                    current_tokens = [currentToken.getShape() + currentToken.getColour()]
                    if (this.updatedPositions.includes(this.tokenBoard[0][i][j])) {
                        placed_tokens = 1
                    } else {
                        placed_tokens = 0
                    }
                    token_sequence = 1
                } else {
                    token_sequence += 1
                    if (this.updatedPositions.includes(this.tokenBoard[0][i][j])) {
                        placed_tokens += 1
                    }
                    if (valid_shape && currentToken.getShape() !== shape) {
                        valid_shape = false
                    }
                    if (valid_colour && currentToken.getColour() !== colour) {
                        valid_colour = false
                    }
                    if (current_tokens.includes(currentToken.getShape() + currentToken.getColour()) || (!valid_colour && !valid_shape)) {
                        return [false, -1, false]
                    }
                    current_tokens.push(currentToken.getShape() + currentToken.getColour())
                }
            } else {
                if (placed_tokens < token_sequence && placed_tokens > 0) {
                    connected = true
                }
                placed_tokens_count = Math.max(placed_tokens_count, placed_tokens)
            }
            prevToken = currentToken
        }
        placed_tokens_count = Math.max(placed_tokens_count, placed_tokens)
        return [true, placed_tokens_count, connected]
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

    public increaseBoard() {
        let left = Infinity, right = 0, top = Infinity, bottom = 0 
        for (let i = 0; i < this.tokenBoard[0].length; i++) {
            for (let j = 0; j < this.tokenBoard[0].length; j++) {
                if (this.tokenBoard[0][i][j].getToken() !== undefined) {
                    left = Math.min(left, j)
                    right = Math.max(right, j + 1)
                    top = Math.min(top, i)
                    bottom = Math.max(bottom, i + 1)
                } 
            }
        }
        let current_size = this.tokenBoard[0].length
        let size_increase =  5 - Math.min(left, top, current_size - right, current_size - bottom)
        for (let i = 0; i < size_increase; i++) {
            this.growBoard()
        }
    }

    public growBoard() {
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

    public getSelectedPosition() {
        return this.selectedPosition
    }

    public removeSelectedPosition() {
        this.selectedPosition = undefined
    }
}
