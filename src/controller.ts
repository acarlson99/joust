"use strict";

import { GameController } from "./gameController";
import { Updater } from "./updater";
import { cardList } from "./cardList";
import { Board } from "./board";
import { IUpdater } from "./IUpdater";

enum EScreenType {
  Game = 0,
  Map,
  MainMenu,
  DeckBuilder,
  __LENGTH,
}

export { EScreenType };

interface IController extends IUpdater {
  handleEvent(e: KeyboardEvent): EScreenType | undefined;
}

export { IController };

class Menu implements IController {
  arrowPos = 0;
  menuItems = ["play", "who?", "deck", "controls"];

  // constructor() {}
  clampPos() {
    this.arrowPos =
      (this.arrowPos + this.menuItems.length) % this.menuItems.length;
  }

  arrowUp() {
    this.arrowPos -= 1;
    this.clampPos();
  }

  arrowDown() {
    this.arrowPos += 1;
    this.clampPos();
  }

  selectCurrentMenuItem() {
    switch (this.menuItems[this.arrowPos]) {
    case "play":
      return EScreenType.Game;
    case "who?":
      window.location.href = "/";
      break;
    case "deck":
      return EScreenType.DeckBuilder;
    }
  }

  update() {
    Updater.Instance.drawMenu(this);
  }

  handleEvent(e: KeyboardEvent) {
    switch (e.key) {
    case "ArrowUp":
      this.arrowUp();
      break;
    case "ArrowDown":
      this.arrowDown();
      break;
    case " ":
    case "Enter":
      return this.selectCurrentMenuItem();
    }
  }
}

export { Menu };

class DeckBuilderController implements IController {
  board: Board;
  constructor() {
    this.board = new Board(Math.ceil(Math.sqrt(cardList.length)), false);
    for (let i = 0; i < cardList.length; i++) {
      const c = cardList[i].copy();
      const x = i % this.board.size;
      const y = Math.floor(i / this.board.size);
      if ((x + y) % 2) {
        c.swapColor();
      }
      this.board.setCard_(x, y, c);
    }
  }

  update() {
    Updater.Instance.updateBoardSize(this.board.size);
    this.board.update();
  }

  handleEvent(e: KeyboardEvent) {
    if (e.key == " ") {
      return EScreenType.MainMenu;
    }
  }
}

class Controller {
  interval: any;
  frameNo: number;
  handleEvent: (e: KeyboardEvent) => void;
  gameScreenType: EScreenType = EScreenType.MainMenu;
  screen?: IController;

  constructor() {
    this.interval = undefined;
    this.frameNo = 0;
    this.setScreen(EScreenType.MainMenu);
    this.handleEvent = (() => {
      return (e: KeyboardEvent) => {
        const newScreen = this.screen?.handleEvent(e);
        if (newScreen !== undefined) {
          this.setScreen(newScreen);
        }
      };
    })();
  }

  setScreen(stype: EScreenType) {
    switch (stype as EScreenType) {
    case EScreenType.Game:
      this.screen = new GameController(8);
      break;
    case EScreenType.MainMenu:
      this.screen = new Menu();
      break;
    case EScreenType.DeckBuilder:
      this.screen = new DeckBuilderController();
      break;
    }
  }

  update() {
    this.screen?.update();
  }
}

export { Controller };

let controller: Controller;
try {
  console.log("CREATE GLOBAL GAME CONTROLLER");
  controller = new Controller();
} catch (e) {
  console.warn("UNABLE TO CREATE CONTROLLER:", e);
}

/* eslint-disable @typescript-eslint/no-unused-vars */
function everyinterval(n: number) {
  if ((controller.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export { controller, everyinterval };