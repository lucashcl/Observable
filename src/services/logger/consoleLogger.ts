import type { IObserver } from "../../lib/observer";
import type { Asset } from "../../models/Asset";
import type { ILogger } from "./ILogger";

export class ConsoleLogger<T> implements ILogger, IObserver<T> {
   async log(message: string): Promise<void> {
      console.log(`${(new Date()).toISOString()}: ${message}`);
   }

   constructor(private callback: (item: T) => string) {

   }

   onNotify(data: T): void {
      this.log(this.callback(data));
   }
}