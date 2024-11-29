import type { Asset } from "./Asset";

export class Transaction {
   private _asset: Asset;
   private _quantity: number;
   private _price: number;
   private _date: Date;
   constructor(asset: Asset, quantity: number, price: number, date: Date) {
      this._asset = asset;
      this._quantity = quantity;
      this._price = price;
      this._date = date;
   }

   get asset(): Asset {
      return this._asset;
   }

   get quantity(): number {
      return this._quantity;
   }

   get price(): number {
      return this._price;
   }

   get date(): Date {
      return this._date;
   }
}