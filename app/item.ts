export class Item {
  name: string;
  sellIn: number;
  quality: number;
  unitQuality: number = 1;

  readonly  maxQualityValue = 50;
  readonly minQualityValue = 0;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  deceaseSellIn() {
    this.sellIn = this.sellIn - 1;
  }

  checkQuality() {
    if(this.quality < this.minQualityValue) {
      this.quality = this.minQualityValue;
    }
    if(this.quality > this.maxQualityValue) {
      this.quality = this.maxQualityValue
    }
  }

  changeQuality() {
    this.quality = this.quality - this.unitQuality;
    if(this.sellIn < 0) {
      this.quality = this.quality - this.unitQuality;
    }
  }

  _modify() {
    this.deceaseSellIn();
    this.changeQuality();
    this.checkQuality();
  }
}
