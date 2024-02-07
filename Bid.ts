//Bid.ts
import { ContractLevel } from "./Contract";
import { Suit, SuitHelper } from "./Suit";

export abstract class Bid {
  alerted = false;

  abstract toString(): string;
}

export class ContractBid extends Bid {
  suit: Suit;
  level: ContractLevel;
  declarer!: import("c:/Users/Marius pc/Desktop/Skole Vår 2024/Videre programmering/Server/src/Position").Position;

  constructor(suit: Suit, level: ContractLevel) {
    super();
    this.suit = suit;
    this.level = level;
  }

  isGreaterThan(other: ContractBid): boolean {
    return this.level > other.level || (this.level === other.level && this.suit > other.suit);
  }

  toString(): string {
    return `${this.level}${SuitHelper.toSymbol(this.suit)}`;
  }
}  

export class DoubleBid extends Bid {
  toString(): string {
    return "X";
  }
}

export class RedoubleBid extends Bid {
  toString(): string {
    return "XX";
  }
}

export class PassBid extends Bid {
  toString(): string {
    return "Pass";
  }
}
