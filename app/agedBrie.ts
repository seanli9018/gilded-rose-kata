import { Item } from './item';

export class AgedBrie extends Item {
  constructor(sellIn: number, quality: number) {
    super('Aged Brie', sellIn, quality);
  }
  _modify() {
    this.increaseQuality();
    this.reduceSellIn();
    if(this.sellIn < 0 ) {
      this.increaseQuality();
    }
  }
}