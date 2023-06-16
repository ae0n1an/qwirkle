import { Token } from "./token"

export class Player {
    private tokens: Token[]
    constructor(initial_tokens: Token[]) {
        this.tokens = initial_tokens
    }
  }