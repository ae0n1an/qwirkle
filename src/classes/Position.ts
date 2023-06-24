import { Observer } from "./observer/observer";
import { Subject } from "./observer/subject";
import { Token } from "./token";

export class Position implements Subject {
    private token?: Token;
    private neighbours: Position[];
    public observers: Observer[];

    constructor() {
      this.token = undefined
      this.neighbours = []
      this.observers = []
    }

    public addNeighbour(neighbour: Position) {
      this.neighbours.push(neighbour)
    }

    public getToken() {
        return this.token
    }

    public placeToken(token: Token) {
      this.token = token
    }

    public removeToken() {
      this.token = undefined
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