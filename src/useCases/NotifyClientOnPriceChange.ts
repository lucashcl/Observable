import type { IObserver } from "../lib/observer"
import type { Client } from "../models/Client"
import { Notification } from "../models/notification"
import type { PriceHistory, PriceRecord } from "../services/PriceHistory"

export class NotifyClientOnPriceChange implements IObserver<PriceHistory> {
   private _lastRecord: PriceRecord = { price: 0, timestamp: new Date() }
   constructor(
      private _priceHistory: PriceHistory,
      private _client: Client,
      private _margin: number
   ) {
      if (_margin <= 0) {
         throw new Error('Margin must be positive')
      }

      _priceHistory.addObserver(this)
   }

   onNotify(data: PriceHistory): void {
      if (!data.lastRecord) {
         return
      }
      const newPrice = data.lastRecord.price
      const oldPrice = this._lastRecord.price
      if (this._lastRecord.price === 0) {
         this._lastRecord = data.lastRecord
         return
      }

      const priceChange = (newPrice - oldPrice) / oldPrice

      if (priceChange > this._margin) {
         this._client.notify(new Notification(`Price of ${this._priceHistory.asset.symbol} has risen ${this._margin * 100}% (U$${newPrice.toFixed(2)})`, new Date()))
         this._lastRecord = data.lastRecord
      } else if (priceChange < -this._margin) {
         this._client.notify(new Notification(`Price has fallen ${this._margin * 100}%`, new Date()))
         this._lastRecord = data.lastRecord
      }
   }
}