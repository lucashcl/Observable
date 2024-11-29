import type { IObserver } from "../../lib/observer";
import type { Asset } from "../../models/Asset";
import type { ILogger } from "./ILogger";
import { appendFile } from "node:fs/promises"

export class FileLogger implements ILogger, IObserver<Asset> {
   constructor(private _destination: string) { }

   async log(message: string): Promise<void> {
      await appendFile(this._destination, `${(new Date()).toISOString()}: ${message}\n`)
   }

   onNotify(data: Asset): void {

      this.log(`${data.symbol} price updated: U$${data.price.toFixed(2)}`);
   }
}