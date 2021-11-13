import { expect } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it ('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    const theItem = items[0];
    expect(theItem.sellIn).to.equal(-1);
    expect(theItem.quality).to.equal(0);
  });

  //"Sulfuras", being a legendary item, never has to be sold or decreases in Quality
  it ('Sulfuras should not reduce quality and sellIn', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 3, 9)]);
    const items = gildedRose.updateQuality();
    const theItem = items[0];
    expect(theItem.sellIn).to.equal(3);
    expect(theItem.quality).to.equal(9);
  })

  //if over due date, "Quality" will be lower as twice speed
  it ('quality should reduce double speed when sellIn less than Zero', () => {
    const gildedRose = new GildedRose([new Item('Foo', 3, 9)]);
    const items = gildedRose.updateQuality();
    const theItem = items[0];
    expect(theItem.sellIn).to.equal(2);
    expect(theItem.quality).to.equal(8);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(theItem.sellIn).to.equal(0);
    expect(theItem.quality).to.equal(6);
    gildedRose.updateQuality();
    expect(theItem.sellIn).to.equal(-1);
    expect(theItem.quality).to.equal(4);
    gildedRose.updateQuality();
    expect(theItem.sellIn).to.equal(-2);
    expect(theItem.quality).to.equal(2);
    gildedRose.updateQuality();
    expect(theItem.sellIn).to.equal(-3);
    expect(theItem.quality).to.equal(0);
    gildedRose.updateQuality();
    expect(theItem.sellIn).to.equal(-4);
    expect(theItem.quality).to.equal(0);
  });
  //the Quality of an item is never negative, The Quality of an item is never more than 50
  //"Aged Brie" actually increases in Quality the older it gets
  it ('Aged brie should add quality when time goes on', () => {
    const gildedRose = new GildedRose([ new Item('Aged Brie', 3, 48)]);
    const items = gildedRose.updateQuality();
    const theItem = items[0];
    expect(theItem.sellIn).to.equal(2);
    expect(theItem.quality).to.equal(49);
    gildedRose.updateQuality();
    expect(theItem.sellIn).to.equal(1);
    expect(theItem.quality).to.equal(50);
    gildedRose.updateQuality();
    expect(theItem.sellIn).to.equal(0);
    expect(theItem.quality).to.equal(50);
    gildedRose.updateQuality();
    expect(theItem.sellIn).to.equal(-1);
    expect(theItem.quality).to.equal(50);
  });

  //"Backstage passes to a TAFKAL80ETC concert", like aged brie, increases in Quality as its SellIn value approaches;
  // 	Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
  // 	Quality drops to 0 after the concert
  it('Backstage passes to a TAFKAL80ETC concert should add quality and be zero when time on', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 32) ]);
    const items = gildedRose.updateQuality();
    const theItem = items[0];
    expect(theItem.sellIn).to.equal(10);
    expect(theItem.quality).to.equal(33);

    gildedRose.updateQuality();
    expect(theItem.sellIn).to.equal(9);
    expect(theItem.quality).to.equal(35);

    gildedRose._runDays(4);
    expect(theItem.sellIn).to.equal(5);
    expect(theItem.quality).to.equal(43);
  });

  it('Run result should same as baseline', () => {

    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("+ 5 Dexterity Vest", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      new Item("Conjured Mana Cake", 3, 6)];

    const gildedRose = new GildedRose(items);

    let days: number = 2;
    const baseline = "--------day 0--------name, sellIn, quality+5 Dexterity Vest 10 20Aged Brie 2 0Elixir of the " +
      "Mongoose 5 7Sulfuras, Hand of Ragnaros 0 80" +
      "+ 5 Dexterity Vest -1 80Backstage passes to a TAFKAL80ETC concert 15 20" +
      "Backstage passes to a TAFKAL80ETC concert 10 49" +
      "Backstage passes to a TAFKAL80ETC concert 5 49" +
      "Conjured Mana Cake 3 6--------day 1--------name, sellIn, " +
      "quality+5 Dexterity Vest 9 19Aged Brie 1 1Elixir of the Mongoose 4 6Sulfuras, " +
      "Hand of Ragnaros 0 80+ 5 Dexterity Vest -2 78Backstage passes to a TAFKAL80ETC concert 14 21" +
      "Backstage passes to a TAFKAL80ETC concert 9 50Backstage passes to a TAFKAL80ETC concert 4 50" +
      "Conjured Mana Cake 2 5";

    let result = "";
    for (let i=0; i<days; i++) {
      result += `--------day ${i}--------`;
      result += "name, sellIn, quality";
      items.forEach(item => {
        result += `${item.name} ${item.sellIn} ${item.quality}`;
      });
      gildedRose.updateQuality();
    }

    expect(baseline).to.equals(result.trim());
  })
});


