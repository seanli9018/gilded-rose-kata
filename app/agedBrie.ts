import { Item } from './item';

export class AgedBrie extends Item {
  constructor(sellIn: number, quality: number) {
    super('Aged Brie', sellIn, quality);
  }

  changeQuality() {
    this.quality = this.quality + this.unitQuality;
    if(this.sellIn < 0 ) {
      this.quality = this.quality + this.unitQuality;
    }
  }
}