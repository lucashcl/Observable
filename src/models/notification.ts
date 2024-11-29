export class Notification {
   private _readAt: Date | null = null;
   private _message: string
   private _timestamp: Date
   constructor(
      message: string,
      timestamp: Date
   ) {
      this._message = message;
      this._timestamp = timestamp
   }

   get message(): string {
      return this._message;
   }

   get timestamp(): Date {
      return this._timestamp;
   }

   get readAt(): Date | null {
      return this._readAt;
   }

   set readAt(date: Date | null) {
      this._readAt = date;
   }
}