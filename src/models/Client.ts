import { NotificationBox } from "../services/NotificationBox";
import type { Asset } from "./Asset";
import type { Notification } from "./notification";
import { Transaction } from "./transaction";

type ClientAsset = { asset: Asset, quantity: number };

export class Client {
   private _name: string;
   private _email: string;
   private _phone: string;
   private _assets: Array<ClientAsset> = [];
   private _transactionHistory: Array<Transaction> = [];
   private _notificationBox = new NotificationBox()
   constructor(name: string, email: string, phone: string) {
      this._name = name;
      this._email = email;
      this._phone = phone;
   }

   get name(): string {
      return this._name;
   }

   get email(): string {
      return this._email;
   }

   get phone(): string {
      return this._phone;
   }

   get assets(): Array<ClientAsset> {
      return this._assets;
   }

   get transactionHistory(): Array<Transaction> {
      return this._transactionHistory;
   }

   get notificationBox(): NotificationBox {
      return this._notificationBox;
   }

   notify(notification: Notification) {
      this._notificationBox.addNotification(notification);
   }

   purchase(asset: Asset, quantity: number, date: Date) {
      this._assets.push({ asset, quantity });
      this._transactionHistory.push(new Transaction(asset, quantity, asset.price, date));
   }

   sell(asset: Asset, quantity: number, date: Date) {
      const transaction = new Transaction(asset, quantity, asset.price, date);
      const index = this._transactionHistory.findIndex(t => t === transaction);
      if (index !== -1) {
         this._transactionHistory.splice(index, 1);
      }
   }

   get balance(): number {
      return this.assets.reduce((acc, { asset, quantity }) => acc + asset.price * quantity, 0);
   }
}