"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeCard_1 = require("../domain/enum/typeCard");
//A complate map of cards for the game
const deckForGame = new Map();
deckForGame.set(typeCard_1.typeCard.A, 1);
deckForGame.set(typeCard_1.typeCard.two, 2);
deckForGame.set(typeCard_1.typeCard.three, 3);
deckForGame.set(typeCard_1.typeCard.four, 4);
deckForGame.set(typeCard_1.typeCard.five, 5);
deckForGame.set(typeCard_1.typeCard.six, 6);
deckForGame.set(typeCard_1.typeCard.sevent, 7);
deckForGame.set(typeCard_1.typeCard.eight, 8);
deckForGame.set(typeCard_1.typeCard.nine, 9);
deckForGame.set(typeCard_1.typeCard.ten, 10);
deckForGame.set(typeCard_1.typeCard.k, 10);
deckForGame.set(typeCard_1.typeCard.j, 10);
deckForGame.set(typeCard_1.typeCard.q, 10);
exports.default = deckForGame;
