import { Observable } from "../lib/observable";

export class Asset extends Observable {
   constructor(
      private _symbol: string,
      private _price: number
   ) {
      super();
   }

   get symbol() {
      return this._symbol;
   }

   set price(price: number) {
      if (price < 0) {
         throw new Error('Price must be positive');
      }

      if (price === this._price) {
         return
      }

      this._price = price;
      this.update();
   }

   get price() {
      return this._price;
   }
}