import { Item } from './item';

export class Conjured extends Item {
  unitQuality = 2;

  constructor(sellIn: number, quality: number) {
    super('Conjured Mana Cake', sellIn, quality);
  }
}