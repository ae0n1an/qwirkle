import { Token } from "./token"
import { Observer } from "./observer/observer"

export class Player implements Observer {
    private name: string
    private tokens: Token[]
    private selected_token?: Token

    constructor(initial_tokens: Token[], name: string) {
        this.name = name
        this.tokens = initial_tokens
        for (const token of this.tokens) {
            token.attach(this)
        }
        this.selected_token = undefined
    }

    public getName(): string {
        return this.name
    }

    public getNumberOfTokens(): number {
        return this.tokens.length
    }

    public addToken(token: Token) {
        this.tokens.push(token)
        token.attach(this)
    }

    update(subject: Token): void {
        if (this.selected_token === subject) {
            this.selected_token = undefined
        } else {
            this.selected_token = subject
        }
    }

    public insertToken(index: number, token: Token) {
        this.tokens.splice(index, 0, token);
    }

    public getTokens() {
        return this.tokens
    }

    public getSelectedToken() {
        return this.selected_token
    }

    public removeSelectedToken() : number {
        if (this.selected_token !== undefined) {
            const tokenIndex = this.tokens.indexOf(this.selected_token);
            if (tokenIndex === -1) {
                console.log('Subject: Nonexistent token.')
                return -1;
            }
            this.tokens.splice(tokenIndex, 1);
            this.selected_token = undefined
            return tokenIndex
        }
        return -1;
    }
  }