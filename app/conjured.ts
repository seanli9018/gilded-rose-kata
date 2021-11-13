import { Item } from './item';

export class Conjured extends Item {
  constructor(sellIn: number, quality: number) {
    super('Conjured Mana Cake', sellIn, quality);
  }
  _modify() {
    // decrease twice as the speed
    this.reduceQuality();
    this.reduceQuality();
    this.reduceSellIn();
    if(this.sellIn < 0 ) {
      this.increaseQuality();
    }
  }
}