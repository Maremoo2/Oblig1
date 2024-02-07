//Contract.ts
import { Position, PositionHelper } from "./Position";
import { Suit, SuitHelper } from "./Suit";

export type ContractDoubledState = "undoubled" | "doubled" | "redoubled";
export type ContractLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Contract = NonPassedContract | "passed";

export class NonPassedContract {
  suit: Suit;
  level: ContractLevel;
  dbl: ContractDoubledState;
  declarer: Position;

  constructor(suit: Suit, level: ContractLevel, declarer: Position, dbl: ContractDoubledState = "undoubled") {
    this.suit = suit;
    this.level = level;
    this.declarer = declarer;
    this.dbl = dbl;
  }

  toString(): string {
    return NonPassedContract.toString(this);
  }

  static toString(c: NonPassedContract): string {
    const doubled = c.dbl === "doubled" ? "x" : c.dbl === "redoubled" ? "xx" : "";
    return `${c.level}${SuitHelper.toSymbol(c.suit)}${doubled} ${c.declarer[0].toUpperCase()}`;
  }

  static fromString(s: string): Contract | undefined {
    const cs = s.toLowerCase().replace(/\s+/g, "").replace("t", "");
    if (cs.length < 3) return undefined;
    const lvl = parseInt(cs[0]);
    const suit = SuitHelper.fromLetter(cs[1]);
    const decl = PositionHelper.fromLetter(cs[cs.length - 1]);
    let d = "undoubled";
    if (cs.includes("xx")) d = "redoubled";
    else if (cs.includes("x")) d = "doubled";

    if (0 < lvl && lvl < 8 && suit && decl) return new NonPassedContract(suit, lvl as ContractLevel, decl, d as ContractDoubledState);
  }
}
