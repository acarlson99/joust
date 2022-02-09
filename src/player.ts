"use strict";

import { Deck } from "./deck";
import { Card } from "./card";

class Hand {
  size: number;
  cs: Card[];
  constructor(size: number) {
    this.size = size;
    this.cs = new Array(size);
  }

  push(i: number, c: Card) {
    // console.log("in push");
    if (i >= this.size) {
      return false;
    }
    // return this.cs.push(c);
    console.log("set", i, c);
    console.log(this.cs);
    this.cs[i] = c;
    console.log(this.cs);
    return true;
  }

  pop(i: number) {
    if (i >= this.size) {
      throw "`pop(" + String(i) + ") exceeds size " + String(this.size);
    }
    const c = this.cs[i];
    this.cs[i] = undefined;
    return c;
  }

  shift() {
    this.cs = this.cs.filter((c) => c);
  }
}

class Player {
  h: Hand;
  d: Deck;
  constructor(hand: Hand, deck: Deck) {
    console.log("PLAYER DECK", deck);
    this.h = hand;
    this.d = deck;
  }

  draw(i: number) {
    console.log("drawing into handpos", i);
    if (this.d.size() > 0) {
      return this.h.push(i, this.d.draw());
    } else {
      return false;
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

  handAt(i) {
    console.log("PLAYER HAND", this.h);
    return this.h.cs[i];
  }

  hand() {
    return [...this.h.cs];
  }
}

export { Player, Hand };