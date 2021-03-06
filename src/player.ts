"use strict";

import { Card } from "./card";
import { Deck } from "./deck";
import { Updater } from "./updater";

class Hand {
  size: number;
  cs: Card[];
  constructor(size: number) {
    this.size = size;
    this.cs = new Array(size);
  }

  push(i: number, c: Card) {
    if (i >= this.size) {
      return false;
    }
    this.cs[i] = c;
    return true;
  }

  pop(i: number) {
    if (i >= this.size) {
      throw "`pop(" + String(i) + ") exceeds size " + String(this.size);
    }
    const c = this.cs[i];
    // this.cs[i] = undefined;
    delete this.cs[i];
    return c;
  }

  clear() {
    this.cs = [];
  }

  shift() {
    this.cs = this.cs.filter((c) => c);
  }

  update(topOrBottom: boolean) {
    for (let i = 0; i < this.cs.length; i++) {
      if (!this.cs[i]) {
        continue;
      }
      this.cs[i].update(
        Updater.Instance.boardSize + i,
        topOrBottom ? 0 : Updater.Instance.boardSize - 1
      );
    }
  }
}

class Player {
  h: Hand;
  d: Deck;
  color: string;
  id: number;
  static colors: string[] = ["blue", "red"];

  constructor(hand: Hand, deck: Deck, id: number) {
    this.h = hand;
    this.d = deck;
    this.color = Player.colors[id];
    this.id = id;
  }

  draw(i: number) {
    if (this.d.size() > 0) {
      const c = this.d.draw();
      if (!c) {
        return false;
      }
      return this.h.push(i, c);
    } else {
      return false;
    }
  }

  drawHand() {
    for (let i = 0; i < this.h.size; i++) {
      this.draw(i);
    }
  }

  play(i: number) {
    const c = this.h.pop(i);
    if (!c) {
      return false;
    }
    if (this.d.size() > 0) {
      return this.draw(i);
    } else {
      this.h.shift();
    }
    return true;
  }

  handAt(i: number) {
    return this.h.cs[i];
  }

  hand() {
    return [...this.h.cs];
  }

  update() {
    this.h.update(this.id == 0);
  }
}

export { Player, Hand };
