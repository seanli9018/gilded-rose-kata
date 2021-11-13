export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  reduceSellIn() {
    this.sellIn = this.sellIn - 1;
  }

  reduceQuality() {
    if(this.quality <= 0) return
    this.quality = this.quality - 1;
    if(this.sellIn < 0) {
      this.quality = this.quality - 1;
    }
  }

  increaseQuality() {
    if(this.quality >= 50) return;
    this.quality = this.quality + 1;
  }

  _modify() {
    this.reduceSellIn();
    this.reduceQuality();
  }
}
