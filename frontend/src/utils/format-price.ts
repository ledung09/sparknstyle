export class PriceFormatUtil {
  static format(price: number): string {
    return price.toLocaleString("de-DE");
  }
}
