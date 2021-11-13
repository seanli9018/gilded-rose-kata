import { Item } from './Item';

export class Sulfuras extends Item {
  constructor(sellIn: number, quality: number) {
    super('Sulfuras, Hand of Ragnaros', sellIn, quality);
  }
  _modify() {
    // no value modification needed
    return;
  };
}