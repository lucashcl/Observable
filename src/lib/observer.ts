export interface IObserver<T> {
   onNotify(data: T): void;
}