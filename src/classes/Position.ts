import { Token } from "./token";

export class Position {
    private token?: Token
    private neighbours: Position[]

    constructor() {
      this.token = undefined
      this.neighbours = []
    }

    public getToken() {
        return this.token
    }
  }