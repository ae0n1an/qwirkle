import { Subject } from "./observer/subject";
import { Observer } from "./observer/observer";

export class Token implements Subject{
    private colour: string
    private shape: string
    private highlighted: boolean
    private observers: Observer[];

    constructor(colour: string, shape: string) {
      this.colour = colour
      this.shape = shape
      this.highlighted = false
      this.observers = []
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

    public getColour() {
        return this.colour
    }

    public getShape() {
        return this.shape
    }

    public getHighlighted() {
        return this.highlighted
    }
  }