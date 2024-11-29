import { Observable } from "../lib/observable";
import type { IObserver } from "../lib/observer";
import type { Asset } from "../models/Asset";

export type PriceRecord = { price: number, timestamp: Date }

export class PriceHistory extends Observable implements IObserver<Asset> {
   private _history: PriceRecord[] = []
   constructor(private _asset: Asset) {
      super()
      _asset.addObserver(this)
   }

   get asset(): Asset {
      return this._asset
   }

   get lastRecord(): PriceRecord | undefined {
      if (this._history.length === 0) {
         return undefined
      }
      return this._history[this._history.length - 1]
   }

   get history(): PriceRecord[] {
      return this._history
   }

   onNotify(asset: Asset): void {
      this._history.push({ price: asset.price, timestamp: new Date() })
      this.update()
   }
}