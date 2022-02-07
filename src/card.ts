"use strict";

import { cardWidth } from "./gameController";
import { Direction, opposites, directionToStr, strToDirection } from "./board";

function rock() {
  var c = new Card("brown", "rock", {});
  c.canBePushed = () => false;
  return c;
}

export { rock };

function statDirection(stats: any, direction: Direction) {
  // console.log("in statdirection");
  // console.log("stats:", stats);
  // console.log(stats, directionToStr(direction));
  if (!stats) return undefined;
  let ds = directionToStr(direction);
  // console.log("stat direction", ds);
  // console.log(stats[ds]);
  if (ds in stats) return stats[ds];
  return undefined;
}

export { statDirection };

// color -- red/blue
// x,y   -- x,y coords on board
class Card {
  color: string;
  name: string;
  width: number;
  stats: any;
  colors = {
    1: "black",
    2: "white",
    3: "maroon",
  };

  constructor(color: string, name: string, stats: any) {
    // console.log("construct card");
    this.color = color;
    this.name = name;
    this.width = cardWidth;
    // lmao no deep copy method so i do this :shrug:
    this.stats = JSON.parse(JSON.stringify(stats));
    // console.log("constructed");
  }

  canPush(direction: Direction) {
    // console.log("in can push");
    // console.log(opposites, direction);
    // console.log(this.stats);
    // console.log("stat direction", statDirection(this.stats, direction)?.v);
    return (statDirection(this.stats, direction)?.v || 0) > 0;
  }

  canBePushed(direction: Direction, priority: number) {
    // console.log("in can be pushed");
    // console.log(opposites, direction);
    // console.log("sd", statDirection(this.stats, opposites[direction]));
    // console.log("in can be pushed");
    const p = statDirection(this.stats, opposites[direction])?.v || 0;
    // console.log("cbp", p, priority);
    // if (this.opposites[direction])
    return p < priority;
  }

  drawArrows(ctx: HTMLCanvasElement, x: number, y: number) {
    // 1/5 wide/ 3/5 long
    const border = 2;
    const margin = this.width / 5;
    const width = this.width / 5 - border;
    ctx.fillStyle = "black";
    const arrowFuncs = [
      {
        d: "l",
        v: [x + border, y + margin, width, this.width - margin * 2],
      },
      {
        d: "r",
        v: [
          x + this.width - width - border,
          y + margin,
          width,
          this.width - margin * 2,
        ],
      },
      {
        d: "u",
        v: [x + margin, y + border, this.width - margin * 2, width],
      },
      {
        d: "d",
        v: [
          x + margin,
          y + this.width - width - border,
          this.width - margin * 2,
          width,
        ],
      },
    ];

    arrowFuncs.forEach((e) => {
      if (!(e.d in this.stats)) {
        return;
      }
      const s = this.stats[e.d];
      if (!(s.v > 0)) return;
      const c = this.colors[s.v];
      ctx.fillStyle = c;
      ctx.fillRect(...e.v);
    });
  }
  update(ctx: HTMLCanvasElement, x: number, y: number) {
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, this.width, this.width);
    ctx.fillStyle = "black";
    if (this.stats) {
      this.drawArrows(ctx, x, y);
    } else {
      console.warn("no stats");
    }
  }
  copy() {
    return new Card(this.color, name, this.stats);
  }
}

export { Card };
