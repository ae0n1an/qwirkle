import { Token } from "./token"
import { Observer } from "./observer/observer"
import { Game } from "./game"

export class Player implements Observer{
    private tokens: Token[]
    private selected_token?: Token
    private game: Game

    constructor(initial_tokens: Token[], game: Game) {
        this.tokens = initial_tokens
        this.game = game
        for (const token of this.tokens) {
            token.attach(this)
            token.attach(this.game)
        }
        this.selected_token = undefined
    }

    update(subject: Token): void {
        if (this.selected_token === subject) {
            this.selected_token.toggleHighlight()
            this.selected_token = undefined
        } else {
            if (this.selected_token !== undefined) {
                this.selected_token.toggleHighlight()
            }
            this.selected_token = subject
            this.selected_token.toggleHighlight()
        }
    }

    public getTokens() {
        return this.tokens
    }

    public getSelectedToken() {
        return this.selected_token
    }
  }