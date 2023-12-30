import { Token } from "./token"
import { Observer } from "./observer/observer"

export class Player implements Observer {
    private name: string
    private id: string
    private avatar: string
    private tokens: Token[]
    private selected_token?: Token
    private score: number

    constructor(initial_tokens: Token[], name: string, id: string, avatar: string) {
        this.id = id
        this.avatar = avatar
        this.name = name
        this.tokens = initial_tokens
        for (const token of this.tokens) {
            token.attach(this)
        }
        this.selected_token = undefined
        this.score = 0
    }

    // Serialize the player object so that it can be sent via emit
    public serialize(): Record<string, any> {
        return {
            name: this.name,
            id: this.id,
            avatar: this.avatar,
            tokens: this.tokens.map(token => token.serialize()),
            selected_token: this.selected_token ? this.selected_token.serialize() : null,
            score: this.score,
        };
    }

      // Deserialize a serialized player object and return a new Player instance
    public static deserialize(data: Record<string, any>): Player {
        const player = new Player([], data.name, data.id, data.avatar);
        player.tokens = data.tokens.map((tokenData: Record<string, any>) => Token.deserialize(tokenData, player));
        player.selected_token = undefined;
        player.score = data.score;

        return player;
    }

    public getId(): string {
        return this.id
    }

    public getScore(): number {
        return this.score
    }

    public getAvatar(): string {
        return this.avatar
    }

    public updateScore(score:number) {
        this.score += score
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
        } else if (this.selected_token !== undefined) {
            let first_token = this.selected_token
            let first_token_index = this.removeSelectedToken()
            this.selected_token = subject
            let second_token_index = this.removeSelectedToken()
            this.insertToken(second_token_index, first_token)
            this.insertToken(first_token_index, subject)
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