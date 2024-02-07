//Suit.ts
enum Suit {
  Clubs = "Clubs",
  Diamonds = "Diamonds",
  Hearts = "Hearts",
  Spades = "Spades",
  Notrump = "Notrump",
}

export class SuitHelper {
  static toString(suit: Suit): string {
    switch (suit) {
      case Suit.Clubs:
        return "Clubs";
      case Suit.Diamonds:
        return "Diamonds";
      case Suit.Hearts:
        return "Hearts";
      case Suit.Spades:
        return "Spades";
      case Suit.Notrump:
        return "Notrump";
      default:
        return "Invalid Suit";
    }
  }

  static toSymbol(suit: Suit): string {
    switch (suit) {
      case Suit.Clubs:
        return "♣";
      case Suit.Diamonds:
        return "♦";
      case Suit.Hearts:
        return "♥";
      case Suit.Spades:
        return "♠";
      case Suit.Notrump:
        return "NT";
      default:
        return "Invalid Suit";
    }
  }

  static toLetter(suit: Suit): string {
    switch (suit) {
      case Suit.Clubs:
        return "C";
      case Suit.Diamonds:
        return "D";
      case Suit.Hearts:
        return "H";
      case Suit.Spades:
        return "S";
      case Suit.Notrump:
        return "N";
      default:
        return "Invalid Suit";
    }
  }

  static fromLetter(letter: string): Suit | undefined {
    switch (letter.toUpperCase()[0]) {
      case "C":
        return Suit.Clubs;
      case "D":
        return Suit.Diamonds;
      case "H":
        return Suit.Hearts;
      case "S":
        return Suit.Spades;
      case "N":
        return Suit.Notrump;
      default:
        return undefined;
    }
  }

  static all(): Suit[] {
    return [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades, Suit.Notrump];
  }
}

export { Suit };
