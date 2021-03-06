"use strict";

import { Card, statDirection } from "./card";
import ISerializable from "./ISerializable";
import { Obstacles } from "./obstacles";
import { Updater } from "./updater";
import { clamp, FString } from "./util";
// import "regenerator-runtime/runtime.js";

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

enum EDirection {
  None = "NONE",
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

declare type EDirectionType = keyof typeof EDirection;

// direction->strings
const dss = {
  [EDirection.None]: "X",
  [EDirection.Up]: "u",
  [EDirection.Down]: "d",
  [EDirection.Left]: "l",
  [EDirection.Right]: "r",
};

// string->directions
const sds = {
  [dss[EDirection.None]]: EDirection.None,
  [dss[EDirection.Up]]: EDirection.Up,
  [dss[EDirection.Down]]: EDirection.Down,
  [dss[EDirection.Left]]: EDirection.Left,
  [dss[EDirection.Right]]: EDirection.Right,
};

export { dss, sds };

const opposites = {
  [EDirection.Up]: EDirection.Down,
  [EDirection.Down]: EDirection.Up,
  [EDirection.Right]: EDirection.Left,
  [EDirection.Left]: EDirection.Right,
  [EDirection.None]: EDirection.None,
};

const directionToStr = (d: EDirection) => dss[d];

const strToDirection = (s: string) => {
  switch (s) {
  case EDirection.Up:
    return EDirection.Up;
  case EDirection.Down:
    return EDirection.Down;
  case EDirection.Left:
    return EDirection.Left;
  case EDirection.Right:
    return EDirection.Right;
  default:
    throw "strToDirection invalid string: '" + s + "'";
  }
};

export {
  EDirection,
  EDirectionType,
  opposites,
  directionToStr,
  strToDirection,
};

const directionF = {
  [EDirection.Up]: [(x: number) => x, (y: number) => y - 1],
  [EDirection.Down]: [(x: number) => x, (y: number) => y + 1],
  [EDirection.Left]: [(x: number) => x - 1, (y: number) => y],
  [EDirection.Right]: [(x: number) => x + 1, (y: number) => y],
  [EDirection.None]: [(x: number) => x, (y: number) => y],
};

enum PushErrno {
  ObstacleInTheWay = "Obstacle in the way {0} {1}",
  OutOfBounds = "Out of bounds {0} {1}",
  NoCardAt = "No card at {0} {1}",
  UnexpectedCardAt = "Unexpected card at {0} {1}",
  CannotPushCard = "Cannot push card at {0} {1} {2} with priority {3} vs {4}",
  CannotPushIntoObject = "Cannot push into {0} {1}",
  NotSettable = "Not a settable position {0} {1}",
  NoArrowPointingInDirection = "No arrow pointing in direction {0}",
}

class PushError extends Error {
  errno: PushErrno;
  args: any;
  constructor(errno: PushErrno, ...args: any) {
    super(new FString(errno).format(...args));
    this.errno = errno;
    this.args = args;
  }
}

class Board implements ISerializable {
  size: number;
  cardMap: Card[][];
  obstacles: Obstacles | undefined;
  gameover: boolean;
  lastPushError?: PushError;

  constructor(size: number, obstacles?: boolean | Obstacles) {
    this.size = size;
    this.cardMap = new Array(this.size);
    for (let i = 0; i < this.cardMap.length; i++) {
      this.cardMap[i] = new Array(this.size);
    }
    // obstacles
    if (obstacles === true) {
      this.obstacles = new Obstacles(size, -1);
    } else if (obstacles instanceof Obstacles) {
      this.obstacles = obstacles;
    } else {
      this.obstacles = undefined;
    }
    this.gameover = false;
  }

  deepcopy() {
    return Board.deserialize(this.serialize());
  }

  serialize(): string {
    return JSON.stringify(this);
  }

  static deserialize(input: string) {
    const obj = JSON.parse(input);
    const size = obj.size;

    const obstacles = obj.obstacles
      ? Obstacles.deserialize(JSON.stringify(obj.obstacles))
      : undefined;

    const board = new Board(size, obstacles);
    board.gameover = obj.gameover;

    for (let i = 0; i < board.size; i++) {
      for (let j = 0; j < board.size; j++) {
        const c = obj.cardMap[i][j] as Card;
        if (c) {
          board.setCard_(j, i, new Card(c.color, c.name, c.stats));
        } else {
          board.unsetCard(j, i);
        }
      }
    }
    return board;
  }

  inBounds(x: number, y: number) {
    return x >= 0 && y >= 0 && x < this.size && y < this.size;
  }

  // if Card exists then return it
  // false -> out of bounds
  // true -> empty square
  getCard(x: number, y: number) {
    if (!this.inBounds(x, y)) {
      return false;
    } else if (this.cardMap[y][x]) {
      return this.cardMap[y][x];
    }
    return undefined;
  }

  // can i set a card in x,y pos
  isSettablePos(x: number, y: number, c: Card) {
    if (!this.obstacles) {
      return true;
    }
    return this.obstacles.isSettable(x, y, false, c.stats.graveyard || false);
  }

  // can i play a card pushing x,y
  isPushablePos(x: number, y: number, c: Card) {
    if (!this.obstacles) {
      return true;
    }
    const c_ = this.getCard(x, y) || undefined;
    return this.obstacles.isSettable(
      x,
      y,
      true,
      // this card has grave OR being played on grave card
      c.stats.graveyard || c_?.stats?.graveyard || false
    );
  }

  setCard(x: number, y: number, c: Card, dontSet = false) {
    if (this.gameover) {
      return false;
    }
    if (!c) {
      console.warn("NOTE: UNSETTING CARD", x, y);
    }
    // cannot place on gem
    if (!this.isSettablePos(x, y, c)) {
      throw new PushError(PushErrno.NotSettable, x, y);
      return false;
    }
    return this.setCard_(x, y, c, dontSet);
  }

  // unsafe, private function
  // will just slap that bad boy down
  // will not check for gem intersection
  // NOTE: places card object, does not create a copy
  setCard_(x: number, y: number, c: any, dontSet = false) {
    if (!c) {
      console.warn("NOTE: UNSETTING CARD", x, y);
    }
    if (!this.inBounds(x, y)) {
      throw new PushError(PushErrno.OutOfBounds, x, y);
      return false;
    }
    if (!dontSet) {
      this.cardMap[y][x] = c;
    }
    return true;
  }

  unsetCard(x: number, y: number) {
    // this.cardMap[y][x] = undefined;
    delete this.cardMap[y][x];
  }

  // NOTE: this WILL NOT check if the first card pushed has an opposite arrow
  private push(
    x: number,
    y: number,
    direction: EDirection,
    priority: number,
    dontPush = false,
    wind = false
  ) {
    if (this.gameover) {
      return false;
    }
    if (direction === EDirection.None) {
      return false;
    }
    const [xf, yf] = directionF[direction];
    const nx = xf(x);
    const ny = yf(y);

    if (!this.inBounds(nx, ny)) {
      throw new PushError(PushErrno.OutOfBounds, nx, ny);
      return false;
    }

    // find if it can push the next Card
    const c = this.getCard(x, y);
    if (!c) {
      throw new PushError(PushErrno.NoCardAt, x, y);
      return undefined;
    }
    // cannot push card into obstacle
    if (this.obstacles && !this.obstacles.isPushable(nx, ny)) {
      throw new PushError(PushErrno.ObstacleInTheWay, nx, ny);
      return false;
    }
    const nc = this.getCard(nx, ny);
    if (nc) {
      if (nc.canBePushed(direction, priority)) {
        // next to non-empty space
        // attempt to push next Card out of the way
        if (statDirection(c.stats, direction)?.bomb) {
          // if pushing in direction of bomb
          // overwrite next card
          if (!dontPush) {
            delete this.cardMap[ny][nx];
          }
        } else {
          // else continue chain
          const cando = this.push(nx, ny, direction, priority, dontPush, wind);
          if (!cando) {
            return false;
          } // cannot push for some reason
        }
      } else {
        throw new PushError(
          PushErrno.CannotPushCard,
          x,
          y,
          direction,
          priority,
          statDirection(nc.stats, opposites[direction])?.v
        );
      }
    }
    this.setCard_(nx, ny, c, dontPush);
    if (!dontPush) {
      delete this.cardMap[y][x];
      this.cardMap[ny][nx]?.bePushed(direction);
      if (wind) {
        this.cardMap[ny][nx]?.swapColor();
      }
      this.obstacles?.cardPlaced(this, nx, ny);
    }
    return [nx, ny];
  }

  // place card on board with direction or no direction to set
  playCard(
    x: number,
    y: number,
    direction: EDirection,
    c: Card,
    dontPush = false
  ) {
    // FIXME: make different functions to interface with internal push func
    // bc you WILL DEFINITELY forget about the `dontPush` param and pull out all your hair
    if (this.gameover) {
      return false;
    }
    try {
      if (direction == EDirection.None) {
        if (!this.isSettablePos(x, y, c)) {
          throw new PushError(PushErrno.NotSettable, x, y);
        } else if (this.getCard(x, y)) {
          throw new PushError(PushErrno.UnexpectedCardAt, x, y);
        }
        const didSet = this.setCard(x, y, c, dontPush);
        if (!didSet) {
          return didSet;
        }
      } else {
        if (!this.isPushablePos(x, y, c)) {
          throw new PushError(PushErrno.ObstacleInTheWay, x, y);
          return false;
        }
        const nc = this.getCard(x, y);
        if (!nc) {
          throw new PushError(PushErrno.NoCardAt, x, y);
        }
        const sd = statDirection(c.stats, direction);
        const p = sd?.v;
        if (!p) {
          // cannot push in direction
          throw new PushError(PushErrno.NoArrowPointingInDirection, direction);
        }
        if (!nc.canBePushed(direction, p)) {
          // can this Card be pushed in direction
          throw new PushError(
            PushErrno.CannotPushCard,
            x,
            y,
            direction,
            p,
            statDirection(c.stats, opposites[direction])?.v
          );
          return false;
        }

        if (
          !(p && this.push(x, y, direction, p, dontPush, sd?.wind || false))
        ) {
          return false;
        }
        const didSet = this.setCard_(x, y, c, dontPush);
        if (!didSet) {
          return didSet;
        }
      }
      if (!dontPush) {
        this.obstacles?.cardPlaced(this, x, y);
      }
      if (this.getCard(x, y)) {
        // slam logic
        for (const k in EDirection) {
          const dir = EDirection[k as EDirectionType] as EDirection;
          if (dir == EDirection.None) {
            continue;
          }
          const sdir = statDirection(c.stats, dir);
          if (!sdir?.slam) {
            continue;
          }
          const [xf, yf] = directionF[dir];
          try {
            const pushedC = this.getCard(xf(x), yf(y));
            if (!pushedC) {
              continue;
            } // no card to push
            if (!pushedC.canBePushed(dir, sdir.v)) {
              continue;
            } // cannot push card
            // attempt to push card
            this.push(xf(x), yf(y), dir, sdir.v, dontPush, sdir?.wind || false);
          } catch (err) {
            if (!(err instanceof PushError)) {
              throw err;
            }
          }
        }
      }
    } catch (err) {
      if (!(err instanceof PushError)) {
        throw err;
      }
      if (dontPush) {
        return false;
      }
      // console.log("caught appropriate error", err);
      this.lastPushError = err;
      return false;
    }
    this.lastPushError = undefined;
    return true;
  }

  turnEnded() {
    this.cardMap.flat().forEach((c) => {
      c.tickModifierTimer();
    });
    this.cardMap.flat().forEach((c) => {
      c.modifierCheck();
    });
    // TODO: find a better way of doing this than adding coords to a set
    const ignorePoss = new Set();
    for (let y = 0; y < this.cardMap.length; y++) {
      const row = this.cardMap[y];
      for (let x = 0; x < row.length; x++) {
        const c = this.getCard(x, y);
        if (!c) {
          continue;
        }
        const ads = c.autoDirsToPush();
        let [nx, ny] = [x, y];
        if (ignorePoss.has(nx * this.size + ny)) {
          console.log("SKIPPING:", nx, ny);
          continue;
        }
        for (let di = 0; di < ads.length; di++) {
          if (!this.getCard(nx, ny)) {
            continue;
          } // fell into pitfall or smth
          const dir = ads[di];
          try {
            const sd = statDirection(c.stats, dir);
            if (!sd) {
              continue;
            }
            const r = this.push(nx, ny, dir, sd.v, false, false);
            if (r) {
              [nx, ny] = r;
            }
            // await sleep(1000);
          } catch {}
        }
        if (this.getCard(nx, ny)) {
          ignorePoss.add(nx * this.size + ny);
        }
      }
    }
    console.log("-------------- TURN END CHECK DONE");
  }

  changeObstacleAt(x: number, y: number) {
    this.obstacles?.incrementObstacleAt(x, y);
  }

  // can card `c` be played anywhere legally on `board`
  canBePlayed(c: Card) {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        // const keys = Object.keys(EDirection);
        const dirs = [
          EDirection.None,
          EDirection.Up,
          EDirection.Down,
          EDirection.Left,
          EDirection.Right,
        ];
        for (let ki = 0; ki < dirs.length; ki++) {
          try {
            if (this.playCard(i, j, dirs[ki], c, true)) {
              return true;
            }
          } catch {
            continue;
          }
        }
      }
    }
    return false;
  }

  getScore() {
    const poss = this.obstacles?.getGemsPos();
    if (!poss) {
      return [0, 0];
    }
    let scoreB = 0;
    let scoreR = 0;
    poss.map(([x, y]) => {
      const c = this.getCard(x, y);
      if (!c) {
        return;
      }
      if (c.color == "blue") {
        scoreB++;
      }
      if (c.color == "red") {
        scoreR++;
      }
    });
    return [scoreB, scoreR];
  }

  // 1 -- p1, -1 -- p2, 0 -- no winner
  checkWin() {
    // const poss = this.obstacles.getGemsPos();
    if (!this.obstacles) {
      return undefined;
    }
    const [scoreB, scoreR] = this.getScore();
    if (scoreB + scoreR < this.obstacles.numGems()) {
      return undefined;
    }
    // if (scoreB + scoreR < poss.length) return undefined;
    const v = clamp(-1, scoreB - scoreR, 1);
    // TODO: readd gameover
    return v;
  }

  static fromStore(storeName: string) {
    const store = window.localStorage;
    const s = store.getItem(storeName);
    if (!s) {
      return undefined;
    }
    const board = Board.deserialize(s);
    return board;
  }

  update() {
    Updater.Instance.updateBoard(this);
    for (let i = 0; i < Updater.Instance.boardSize; i++) {
      for (let j = 0; j < Updater.Instance.boardSize; j++) {
        const c = this.getCard(i, j);
        if (c && c.update) {
          c.update(i, j);
        }
      }
    }

    this.obstacles?.update();
  }
}

export { Board };
