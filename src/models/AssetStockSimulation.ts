import type { ISimulatable } from "../lib/ISimulatable";
import { Random } from "../utils/random";
import type { Asset } from "./Asset";

export class AssetStockSimulation implements ISimulatable {
   constructor(
      private _asset: Asset,
      private _trend: number,
      private _volatility: number
   ) {
      if (this._asset.price < 0) {
         throw new Error('Price must be positive');
      }

      if (_volatility < 0) {
         throw new Error('Volatility must be positive');
      }

      if (_trend < 0) {
         throw new Error('Trend must be positive');
      }
   }

   get price(): number {
      return this._asset.price;
   }

   get symbol(): string {
      return this._asset.symbol;
   }

   simulate(): void {
      const randomShock = this._volatility * Random.range(-1, 1);
      this._asset.price *= 1 + this._trend + randomShock;
   }
}