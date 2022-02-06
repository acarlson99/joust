"use strict";

import { cardWidth, xToCoord, yToCoord } from "./gameController.js";
import { clamp } from "./util.js";

class Cursor {
  constructor(game, ce) {
    this.size = game.boardSize();
    this.game = game;
    this.ce = ce;
    this.x = Math.floor(this.size / 2);
    this.y = Math.floor(this.size / 2);
    this.heldCard = undefined;
  }

  move(direction) {
    console.log("MOVE", direction);
    switch (direction) {
      case "u":
        this.y -= 1;
        break;
      case "d":
        this.y += 1;
        break;
      case "l":
        this.x -= 1;
        break;
      case "r":
        this.x += 1;
        break;
    }
    this.x = clamp(0, this.x, this.size - 1);
    this.y = clamp(0, this.y, this.size - 1);
  }

  holdCard(c) {
    this.heldCard = c;
    console.log("HOLDING CARD", this.heldCard);
  }

  pushHeldCard(direction) {
    console.log("cursor push", this.x, this.y, direction);
    const c = this.game.board.getCard(this.x, this.y);
    if (!c || !this.heldCard) return false;
    const pushed = this.game.pushC(this.x, this.y, direction, this.heldCard);
    console.log("PUSH RETURNED:", pushed);
    if (!pushed) return false;
    this.heldCard = undefined;

    // FIXME: this does not belong here
    const winner = this.game.board.checkWin();
    if (winner) {
      document.getElementById(
        winner == 1 ? "p1score" : "p2score"
      ).style.background = "lavender";
    }
    console.log("truuuuu");
    return true;
  }

  placeHeldCard() {
    // if (this.game.board.getCard(this.x, this.y) !== undefined) return false;
    const r = this.game.pushC(this.x, this.y, false, this.heldCard);
    console.log("PUSH RETURNED:", r);

    // FIXME: this does not belong here
    const winner = this.game.board.checkWin();
    if (winner) {
      document.getElementById(
        winner == 1 ? "p1score" : "p2score"
      ).style.background = "lightgreen";
    }
    return r;
    // return this.game.pushC(this.x, this.y, this.heldCard);
  }

  update(ctx) {
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.rect(
      xToCoord(this.x) + ctx.lineWidth / 2,
      yToCoord(this.y) + ctx.lineWidth / 2,
      cardWidth - ctx.lineWidth,
      cardWidth - ctx.lineWidth
    );
    ctx.stroke();
  }
}

export { Cursor };
