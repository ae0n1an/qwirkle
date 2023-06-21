import { Observer } from "./observer/observer";
import { Subject } from "./observer/subject";
import { Token } from "./token";

export class Position implements Subject {
    private token?: Token
    private neighbours: Position[]
    private observers: Observer[];
    private highlighted: boolean;

    constructor() {
      this.token = undefined
      this.neighbours = []
      this.observers = []
      this.highlighted = false
    }

    attach(observer: Observer): void {
      this.observers.push(observer)
    }

    detach(observer: Observer): void {
      const observerIndex = this.observers.indexOf(observer);
      if (observerIndex === -1) {
          return console.log('Subject: Nonexistent observer.');
      }

      this.observers.splice(observerIndex, 1);
    }

    notify(): void {
      for (const observer of this.observers) {
        observer.update(this);
      }
    }

    public toggleHighlight() {
      this.highlighted = !this.highlighted
    }

    public getToken() {
        return this.token
    }

    public placeToken(token: Token) {
      this.token = token
    }

    public getHighlighted() {
      return this.highlighted
  }
  }