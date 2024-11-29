import type { IObserver } from "./observer";

export abstract class Observable {
   private _observers: Array<IObserver<this>> = [];

   update() {
      for (const observer of this._observers) {
         observer.onNotify(this);
      }
   }

   addObserver(observer: IObserver<this>) {
      this._observers.push(observer);
   }

   removeObserver(observer: IObserver<this>) {
      const index = this._observers.indexOf(observer);
      if (index !== -1) {
         this._observers.splice(index, 1);
      }
   }
}