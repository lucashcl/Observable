export class Duration {
   private _milliseconds: number;
   private constructor(milliseconds: number) {
      this._milliseconds = milliseconds;
   }

   get milliseconds(): number {
      return this._milliseconds;
   }

   static fromMilliseconds(milliseconds: number): Duration {
      return new Duration(milliseconds);
   }

   static fromSeconds(seconds: number): Duration {
      return new Duration(seconds * 1000);
   }

   static fromMinutes(minutes: number): Duration {
      return new Duration(minutes * 60 * 1000);
   }

   static fromHours(hours: number): Duration {
      return new Duration(hours * 60 * 60 * 1000);
   }

   static fromDays(days: number): Duration {
      return new Duration(days * 24 * 60 * 60 * 1000);
   }

   static fromWeeks(weeks: number): Duration {
      return new Duration(weeks * 7 * 24 * 60 * 60 * 1000);
   }
}