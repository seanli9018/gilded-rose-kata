import { Item } from './item';

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  // only for testing purpose;
  _runDays(days: number) {
    for (let d = 0; d < days; d++) {
      this.updateQuality();
    }
  }

  updateQuality() {
    this.items.forEach(item => {item._modify()});
    return this.items;
  }
}
