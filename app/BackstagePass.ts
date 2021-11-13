import { Item } from './Item';

export class BackstagePass extends Item {
  constructor(sellIn: number, quality: number) {
    super('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);
  }
  _modify() {
    this.increaseQuality();
    if(this.sellIn < 11) {
      this.increaseQuality();
    }
    if(this.sellIn < 6) {
      this.increaseQuality();
    }
    this.reduceSellIn();
    if(this.sellIn < 0){
      this.quality = 0;
    }
  }
}