import { Subject } from "./observer/subject";
import { Observer } from "./observer/observer";

export class Token implements Subject{
    private colour: string
    private shape: string;
    public observers: Observer[];

    constructor(colour: string, shape: string) {
      this.colour = colour
      this.shape = shape
      this.observers = []
    }

    // Serialize the token object so that it can be sent via emit
    public serialize(): Record<string, any> {
      return {
        colour: this.colour,
        shape: this.shape,
      };
    }

      // Deserialize a serialized token object and return a new Token instance
    public static deserialize(data: Record<string, any>, player?:Observer): Token {
      const token = new Token(data.colour, data.shape)
      if (player) {
        token.attach(player)
      }
      return token;
    }

    public getColour() {
        return this.colour
    }

    public getShape() {
        return this.shape
    }

    // Attach an observer to the subject.
    attach(observer: Observer): void {
      this.observers.push(observer)
    }

    // Detach an observer from the subject.
    detach(observer: Observer): void {
      const observerIndex = this.observers.indexOf(observer);
      if (observerIndex === -1) {
          return console.log('Subject: Nonexistent observer.');
      }
      this.observers.splice(observerIndex, 1);
    }

    // Notify all observers about an event.
    notify(): void {
      for (const observer of this.observers) {
          observer.update(this);
      }
    }
  }