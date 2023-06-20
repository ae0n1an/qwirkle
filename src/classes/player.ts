import { Token } from "./token"
import { Observer } from "./observer/observer"

export class Player implements Observer{
    private tokens: Token[]
    private selected_token?: Token

    constructor(initial_tokens: Token[]) {
        this.tokens = initial_tokens
        for (const token of this.tokens) {
            token.attach(this)
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
  }