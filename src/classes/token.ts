export class Token {
    private colour: string
    private shape: string

    constructor(colour: string, shape: string) {
      this.colour = colour
      this.shape = shape
    }

    public getColour() {
        return this.colour
    }

    public getShape() {
        return this.shape
    }
  }