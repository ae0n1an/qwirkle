import { Position } from "./position";
import { Observer } from "./observer/observer";

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

    // Serialize the board object so that it can be sent via emit
    public serialize(): Record<string, any> {
        return {
        tokenBoard: this.tokenBoard.map((grid, y) =>
            grid.map((row, x) =>
                row.map(position => position.serialize())
            )
        ),
        selectedPosition: null, // no positions should be selected when the game is emitted
        updatedPositions: [], // no positions should be updated when the game is emitted
        boardEmpty: this.boardEmpty,
        };
    }

    // Deserialize a serialized board object and return a new Board instance
    public static deserialize(data: Record<string, any>): Board {
        const board = new Board();
        board.tokenBoard = data.tokenBoard.map((grid: any) =>
        grid.map((row: any) =>
            row.map((positionData: Record<string, any>) =>
                Position.deserialize(positionData, board)
            )
        )
        );
        // You may need to implement deserialization for Position if needed
        board.selectedPosition = undefined;
        board.updatedPositions = [];
        board.boardEmpty = data.boardEmpty;

        return board;
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

    public validateBoard() : [boolean, number] {
        let valid_row, valid_col
        let tiles_placed_continuously = false
        let tiles_connected = this.boardEmpty // if the board is empty then if the play is valid it will be connected
        let score = 0
        if (this.updatedPositions.length === 0) {
            return [false, 0]
        }
        for (let i = 0; i < this.tokenBoard[0].length; i++) {
            valid_row = this.validateRow(i)
            valid_col = this.validateColumn(i)
            if (!valid_row[0] || !valid_col[0]) {
                return [false, 0]
            }
            if (valid_row[1] === this.updatedPositions.length || valid_col[1] === this.updatedPositions.length) {
                tiles_placed_continuously = true
            }
            if (valid_row[2] || valid_col[2]) {
                tiles_connected = true
            }
            score += valid_col[3] + valid_row[3]
        }
        if (tiles_placed_continuously && tiles_connected) {
            this.clearUpdatedPositions()
            this.boardEmpty = false 
            return [true, score]
        } else {
            return [false, 0]
        }
    }

    private validateColumn(i: number) : [boolean, number, boolean, number] {
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
        let score = 0

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
                        return [false, -1, false, 0]
                    }
                    current_tokens.push(currentToken.getShape() + currentToken.getColour())
                }
            } else if (prevToken !== undefined) {
                if (placed_tokens < token_sequence && placed_tokens > 0) {
                    connected = true
                }
                if (placed_tokens > 0 && token_sequence > 1) {
                    if (token_sequence === 6) {
                        score += 12
                    } else {
                        score += token_sequence
                    }
                }
                placed_tokens_count = Math.max(placed_tokens_count, placed_tokens)
            }
            prevToken = currentToken
        }
        if (prevToken !== undefined) {
            if (placed_tokens < token_sequence && placed_tokens > 0) {
                connected = true
            }
            if (placed_tokens > 0 && token_sequence > 1) {
                if (token_sequence === 6) {
                    score += 12
                } else {
                    score += token_sequence
                }
            }
            placed_tokens_count = Math.max(placed_tokens_count, placed_tokens)
        }
        return [true, placed_tokens_count, connected, score]
    }

    private validateRow(i: number) : [boolean, number, boolean, number] {
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
        let score = 0

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
                        return [false, -1, false, 0]
                    }
                    current_tokens.push(currentToken.getShape() + currentToken.getColour())
                }
            } else if (prevToken !== undefined) {
                if (placed_tokens < token_sequence && placed_tokens > 0) {
                    connected = true
                }
                if (placed_tokens > 0 && token_sequence > 1) {
                    if (token_sequence === 6) {
                        score += 12
                    } else {
                        score += token_sequence
                    }
                }
                placed_tokens_count = Math.max(placed_tokens_count, placed_tokens)
            }
            prevToken = currentToken
        }
        if (prevToken !== undefined) {
            if (placed_tokens > 0 && token_sequence > 1) {
                if (token_sequence === 6) {
                    score += 12
                } else {
                    score += token_sequence
                }
            }
            if (placed_tokens < token_sequence && placed_tokens > 0) {
                connected = true
            }
            placed_tokens_count = Math.max(placed_tokens_count, placed_tokens)
        }
        return [true, placed_tokens_count, connected, score]
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
        while (size_increase > 0) {
            this.growBoard(left < (current_size-right), top < (current_size - bottom))
            left = Infinity
            right = 0
            top = Infinity
            bottom = 0 
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
            current_size = this.tokenBoard[0].length
            size_increase =  5 - Math.min(left, top, current_size - right, current_size - bottom)
        }
    }

    public growBoard(left: boolean, top: boolean) {
        // add left and right columns to the board updating their neighbours
        for (let i = 0; i < this.tokenBoard[0].length; i++) {
            if (left) {
                this.tokenBoard[0][i] = [new Position(), ...this.tokenBoard[0][i]]
                this.tokenBoard[0][i][0].addNeighbour(this.tokenBoard[0][i][1])
                this.tokenBoard[0][i][1].addNeighbour(this.tokenBoard[0][i][0])
                this.tokenBoard[0][i][0].attach(this)
            } else {
                this.tokenBoard[0][i] = [...this.tokenBoard[0][i], new Position()]
                this.tokenBoard[0][i][this.tokenBoard[0].length-1].addNeighbour(this.tokenBoard[0][i][this.tokenBoard[0].length])
                this.tokenBoard[0][i][this.tokenBoard[0].length].addNeighbour(this.tokenBoard[0][i][this.tokenBoard[0].length-1])
                this.tokenBoard[0][i][this.tokenBoard[0].length].attach(this)
            }
        }

        let new_row = []

        for (let i = 0; i < this.tokenBoard[0].length + 1; i++) { // add start and end rows to the token board updating their neighbours
            new_row.push(new Position())
            new_row[i].attach(this)
            new_row[i].addNeighbour(this.tokenBoard[0][0][i])
            this.tokenBoard[0][0][i].addNeighbour(new_row[i])
        }
        if (top) {
            this.tokenBoard[0] = [new_row, ...this.tokenBoard[0]]
        } else {
            this.tokenBoard[0] = [...this.tokenBoard[0], new_row]
        }
        
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
