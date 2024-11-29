import { Observable } from "../lib/observable";
import type { Notification } from "../models/notification";

export class NotificationBox extends Observable {
   private _notifications: Array<Notification> = [];

   get notifications(): Array<Notification> {
      return this._notifications;
   }

   addNotification(notification: Notification) {
      this._notifications.push(notification);
      this.update();
   }

   get last(): Notification | undefined {
      if (this._notifications.length === 0) {
         return undefined;
      }
      return this._notifications[this._notifications.length - 1];
   }

   get unread() {
      return this._notifications.filter(n => !n.readAt);
   }

   get read() {
      return this._notifications.filter(n => n.readAt);
   }

   markAsRead(notification: Notification) {
      notification.readAt = new Date();
   }

   markAllAsRead() {
      for (const notification of this._notifications) {
         notification.readAt = new Date();
      }
   }

   clear() {
      this._notifications = [];
   }

   remove(notification: Notification) {
      const index = this._notifications.indexOf(notification);
      if (index !== -1) {
         this._notifications.splice(index, 1);
      }
   }

   removeRead() {
      this._notifications = this._notifications.filter(n => !n.readAt)
   }

   get count() {
      return this._notifications.length;
   }
}