import { Item } from './item';

export class BackstagePass extends Item {
  constructor(sellIn: number, quality: number) {
    super('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);
  }

  changeQuality() {
    if(this.sellIn < 0){
      this.quality = 0;
    }else if(this.sellIn < 5) {
      this.quality = this.quality + 3;
    } else if (this.sellIn < 10) {
      this.quality = this.quality + 2;
    } else {
      this.quality = this.quality + this.unitQuality;
    }
  }
}