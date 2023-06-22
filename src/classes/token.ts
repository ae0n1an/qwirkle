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