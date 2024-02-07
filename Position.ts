//Position.ts
enum Position {
    North = "north",
    East = "east",
    South = "south",
    West = "west",
  }
  
  enum Side {
    NS = "ns",
    EW = "ew",
  }
  
  class PositionHelper {
    static nextPosition(position: Position, count = 1): Position {
      if (count == 0) return position;
      let pos: Position;
      switch (position) {
        case Position.North:
          pos = Position.East;
          break;
        case Position.East:
          pos = Position.South;
          break;
        case Position.South:
          pos = Position.West;
          break;
        case Position.West:
          pos = Position.North;
          break;
      }
  
      return PositionHelper.nextPosition(pos, count - 1);
    }
  
    static nextPosisitionFrom(positions: Array<Position>, position: Position): Position {
      const currentIndex = positions.indexOf(position);
      if (currentIndex < 0) throw new Error("Position not found in array");
      const nextIndex = (currentIndex + 1) % positions.length;
      return positions[nextIndex];
    }
  
    static side(position: Position): Side {
      return position === Position.North || position === Position.South ? Side.NS : Side.EW;
    }
  
    static toString(position: Position): string {
      return Object.keys(Position)[Object.values(Position).indexOf(position)];
    }
  
    static fromLetter(letter: string): Position | undefined {
      switch (letter.toUpperCase()[0]) {
        case "N":
          return Position.North;
        case "E":
          return Position.East;
        case "S":
          return Position.South;
        case "W":
          return Position.West;
      }
    }
  
    static all(): Array<Position> {
      // no idea
      return [Position.North, Position.East, Position.South, Position.West];
    }
  }
  
  // TODO remove
  type PositionList<T> = { [key in Position]: T };
  type PartialPositionList<T> = { [key in Position]?: T };
  
  export { Position, PositionHelper, type PositionList, type PartialPositionList, Side };
