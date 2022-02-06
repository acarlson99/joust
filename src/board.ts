"use strict";

import { xToCoord, yToCoord } from "./gameController";
import { cardWidth } from "./gameController";
import { clamp } from "./util";
import { Card, statDirection } from "./card";
// import { rock } from "./Card";

enum Direction {
  None = 1,
  Up,
  Down,
  Left,
  Right,
}

const dss = {
  [Direction.None]: "X",
  [Direction.Up]: "u",
  [Direction.Down]: "d",
  [Direction.Left]: "l",
  [Direction.Right]: "r",
};

const directionToStr = (d: Direction) => dss[d];

export { Direction, directionToStr };

const directionF = {
  [Direction.Up]: [(x: number) => x, (y: number) => y - 1],
  [Direction.Down]: [(x: number) => x, (y: number) => y + 1],
  [Direction.Left]: [(x: number) => x - 1, (y: number) => y],
  [Direction.Right]: [(x: number) => x + 1, (y: number) => y],
};

class Obstacles {
  size: number;
  numGems: number;
  m: any[];
  x: number;
  y: number;
  s: string;
  constructor(size: number, numGems = undefined) {
    this.size = size;
    if (numGems === undefined) {
      this.numGems = Math.floor(size / 4) * 2 + 1;
      console.log(numGems);
    } else {
      this.numGems = numGems;
    }
    this.m = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      this.m[i] = new Array(this.size);
    }
    for (let i = 0; i < this.numGems; i++) {
      const x = Math.floor(Math.random() * this.size);
      const y = Math.floor(Math.random() * this.size);
      if (this.m[y][x]) {
        i--;
        continue;
      }

      this.m[y][x] = new this.gem(x, y);
      //   console.log("GEM", x, y);
    }
    // console.log(this.getGemsPos());
  }
  getGemsPos() {
    // this.m.flatMap((a) => console.log(a));
    return this.m.flat().map((v) => [v.x, v.y]);
  }
  getGem(x: number, y: number) {
    const g = this.m[y][x];
    return g && g.s == new this.gem(x, y).s;
  }
  gem(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.s = "gem";
    this.update = (context) => {
      const radius = cardWidth / 3;
      const centerX = xToCoord(x) + cardWidth / 2;
      const centerY = yToCoord(y) + cardWidth / 2;

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = "green";
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = "#003300";
      context.stroke();
    };
  }
  update(ctx: HTMLCanvasElement) {
    this.m.forEach((a) => a.forEach((o) => (o ? o.update(ctx) : o)));
  }
}

class Board {
  size: any;
  cardMap: any[];
  obstacles: Obstacles;
  gameover: boolean;
  constructor(size) {
    this.size = size;
    this.cardMap = new Array(this.size);
    for (let i = 0; i < this.cardMap.length; i++) {
      this.cardMap[i] = new Array(this.size);
    }
    // obstacles
    // this.cardMap[0][0] = rock();
    this.obstacles = new Obstacles(size);
    this.gameover = false;
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

  setCard(x: number, y: number, c: Card, dontSet = false) {
    if (this.gameover) return false;
    // if (!c) {
    //   console.warn("NOTE: UNSETTING CARD", x, y);
    // }
    // cannot place on gem
    if (this.obstacles.getGem(x, y)) return false;
    return this.setCard_(x, y, c, dontSet);
    // this.cardMap[y][x] = c;
    // return true;
  }

  // unsafe, private function
  // will just slap that bad boy down
  // will not check for gem intersection
  setCard_(x: number, y: number, c: any, dontSet = false) {
    if (!c) {
      console.warn("NOTE: UNSETTING CARD", x, y);
    }
    if (!this.inBounds(x, y)) {
      return false;
    }
    if (!dontSet) this.cardMap[y][x] = c;
    return true;
  }

  push(
    x: number,
    y: number,
    direction: Direction,
    priority: any,
    dontPush = false
  ) {
    if (this.gameover) return false;
    console.log("PUSHING", x, y, directionToStr(direction));
    const [xf, yf] = directionF[direction];
    const nx = xf(x);
    const ny = yf(y);
    console.log(x, y);
    console.log("TO");
    console.log(nx, ny);

    // find if it can push the next Card
    const nc = this.getCard(nx, ny);
    const c = this.getCard(x, y);
    if (!c) {
      return undefined;
    } else if (!c.canPush(direction, priority)) {
      // can this Card be pushed in direction
      console.log("no push");
      return false;
    }
    if (nc === false) {
      return false;
    }
    if (nc !== undefined) {
      // next to non-empty space
      // attempt to push next Card out of the way
      const cando = this.push(nx, ny, direction, priority, dontPush);
      console.log("cando", cando);
      if (!cando) {
        return false;
      } // cannot push for some reason
    }
    const r = this.setCard_(nx, ny, c, dontPush);
    console.log("SET:", r);
    if (!dontPush) delete this.cardMap[y][x];
    return r;
  }

  // direction param optional
  // sans direction this function places instead
  pushC(x: number, y: number, direction: Direction, c: Card, dontPush = false) {
    // FIXME: make different functions to interface with internal push func
    // bc you WILL DEFINITELY forget about the `dontPush` param and pull out all your hair
    // console.log("a", this.gameover);
    if (this.gameover) return false;
    if (direction != Direction.None) {
      console.log("C:", c);
      console.log("dir", direction);
      // cannot push in direction
      console.log("CAN BE PUSHED", c.canPush(direction));
      const p = statDirection(c.stats, direction)?.v;
      console.log("priority", p);
      if (!c.canBePushed(direction, p)) return false;
      if (p && this.push(x, y, direction, p, dontPush))
        return this.setCard_(x, y, c, dontPush);
      return false;
    } else {
      if (this.getCard(x, y)) return false;
      console.log("c");
      return this.setCard(x, y, c, dontPush);
    }
  }

  getScore() {
    const poss = this.obstacles.getGemsPos();
    var scoreB = 0;
    var scoreR = 0;
    poss.map(([x, y]) => {
      const c = this.getCard(x, y);
      if (!c) return;
      if (c.color == "blue") scoreB++;
      if (c.color == "red") scoreR++;
    });
    return [scoreB, scoreR];
  }

  checkWin() {
    // const poss = this.obstacles.getGemsPos();
    const [scoreB, scoreR] = this.getScore();
    if (scoreB + scoreR < this.obstacles.numGems) return undefined;
    // if (scoreB + scoreR < poss.length) return undefined;
    const v = clamp(-1, scoreB - scoreR, 1);
    console.log("WINNER WINNER CHICKEN DINNER", v);
    this.gameover = true;
    return v;
  }

  update(ctx: HTMLCanvasElement) {
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        let c = this.getCard(i, j);
        if (c && c.update) {
          c.update(ctx, xToCoord(i), yToCoord(j));
        }
      }
    }
    this.obstacles.update(ctx);
  }
}

export { Board };