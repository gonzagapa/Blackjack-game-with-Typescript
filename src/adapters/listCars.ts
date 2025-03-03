import {typeCard} from "../domain/enum/typeCard";

const deckForGame = new Map();
deckForGame.set(typeCard.A, 1);
deckForGame.set(typeCard.two, 2);
deckForGame.set(typeCard.three, 3);
deckForGame.set(typeCard.four, 4);
deckForGame.set(typeCard.five, 5);
deckForGame.set(typeCard.six, 6);
deckForGame.set(typeCard.sevent, 7);
deckForGame.set(typeCard.eight, 8);
deckForGame.set(typeCard.nine, 9);
deckForGame.set(typeCard.ten, 10);
deckForGame.set(typeCard.k, 10);
deckForGame.set(typeCard.j, 10);
deckForGame.set(typeCard.q, 10);

export default deckForGame;