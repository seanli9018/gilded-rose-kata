export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  isAgedBrie() {
    return this.name === 'Aged Brie';
  }

  isBackStage() {
    return this.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  isSulfuras() {
    return this.name === 'Sulfuras, Hand of Ragnaros'
  }

  reduceSellIn() {
    if(this.isSulfuras()) return;
    this.sellIn = this.sellIn - 1;
  }

  reduceQuality() {
    if(this.isSulfuras() || this.quality<= 0) return;
    this.quality = this.quality - 1;
    if(this.sellIn < 0) {
      this.quality = this.quality - 1;
    }
  }

  increaseQuality() {
    if(this.quality >= 50) return;
    this.quality = this.quality + 1;
  }
}

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

  //main handler(helper)
  _modifyItemValue(item: Item) {
    if(item.isAgedBrie()) {
      item.increaseQuality();
      item.reduceSellIn();
      if(item.sellIn < 0 ) {
        item.increaseQuality();
      }
    } else if(item.isBackStage()){
      item.increaseQuality();
      if(item.sellIn < 11) {
        item.increaseQuality();
      }
      if(item.sellIn < 6) {
        item.increaseQuality();
      }
      item.reduceSellIn();
      if(item.sellIn < 0){
        item.quality = 0;
      }
    } else {
      item.reduceSellIn();
      item.reduceQuality();
    }
  }

  updateQuality() {
    this.items.forEach(item => {this._modifyItemValue(item)});
    return this.items;
  }
}
