import type { Duration } from "./duration";
import type { ISimulatable } from "./ISimulatable";

export class Simulation {
   static run(simulatable: ISimulatable, duration: Duration): void {
      const simulation = new Simulation(simulatable, duration);
      simulation.startSimulation();
   }
   private timer: Timer | null = null;
   constructor(
      private simulatable: ISimulatable,
      private _duration: Duration
   ) { }
   get isSimulationRunning(): boolean {
      return this.timer !== null;
   }

   startSimulation(): void {
      if (this.isSimulationRunning) {
         return
      }
      this.timer = setInterval(() => {
         this.simulatable.simulate()
      }, this._duration.milliseconds);
   }

   stopSimulation(): void {
      if (this.isSimulationRunning) {
         clearInterval(this.timer as Timer);
      }
   }
}