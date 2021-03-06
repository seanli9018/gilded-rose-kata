import { expect } from 'chai';
import { Item } from '../../app/item';
import { GildedRose } from '@/gilded-rose';
import { Sulfuras } from '../../app/sulfuras';
import { AgedBrie } from '../../app/agedBrie';
import { BackstagePass } from '../../app/backstagePass';
import {Conjured} from '../../app/conjured';

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
    const gildedRose = new GildedRose([new Sulfuras(3, 9)]);
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
    const gildedRose = new GildedRose([new AgedBrie(3, 48)]);
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
    const gildedRose = new GildedRose([new BackstagePass(11, 32) ]);
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

  //"Conjured" items degrade in Quality twice as fast as normal items
  it ('Conjured Mana Cake test', () => {
    const gildedRose = new GildedRose([new Conjured(3, 6), new Conjured(1, 46) ]);
    const items = gildedRose.updateQuality();
    const theItem = items[0];
    const otherItem = items[1];
    expect(theItem.sellIn).to.equal(2);
    expect(theItem.quality).to.equal(4);
    expect(otherItem.sellIn).to.equal(0);
    expect(otherItem.quality).to.equal(44);

    gildedRose.updateQuality();
    expect(theItem.sellIn).to.equal(1);
    expect(theItem.quality).to.equal(2);
    expect(otherItem.sellIn).to.equal(-1);
    expect(otherItem.quality).to.equal(40);

    gildedRose.updateQuality();
    expect(theItem.sellIn).to.equal(0);
    expect(theItem.quality).to.equal(0);
    expect(otherItem.sellIn).to.equal(-2);
    expect(otherItem.quality).to.equal(36);
  })

  it('Run result should same as baseline', () => {

    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new AgedBrie(2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Sulfuras(0, 80),
      new Sulfuras(-1, 80),
      new BackstagePass(15, 20),
      new BackstagePass(10, 49),
      new BackstagePass(5, 49),
      new Conjured(3, 6)];

    const gildedRose = new GildedRose(items);

    let days: number = 2;
    const baseline = "--------day 0--------name, sellIn, quality+5 Dexterity Vest 10 20Aged Brie 2 0Elixir of the Mongoose " +
      "5 7Sulfuras, Hand of Ragnaros 0 80Sulfuras, Hand of Ragnaros -1 80Backstage passes to a TAFKAL80ETC concert 15 " +
      "20Backstage passes to a TAFKAL80ETC concert 10 49Backstage passes to a TAFKAL80ETC concert 5 49" +
      "Conjured Mana Cake 3 6--------day 1--------name, sellIn, quality+5 Dexterity Vest 9 19Aged Brie 1 1" +
      "Elixir of the Mongoose 4 6Sulfuras, Hand of Ragnaros 0 80Sulfuras, Hand of Ragnaros -1 80" +
      "Backstage passes to a TAFKAL80ETC concert 14 21Backstage passes to a TAFKAL80ETC concert 9 50" +
      "Backstage passes to a TAFKAL80ETC concert 4 50Conjured Mana Cake 2 4";

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


