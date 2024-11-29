export const Random = {
   range(min: number, max: number): number {
      return Math.random() * (max - min) + min;
   }
}