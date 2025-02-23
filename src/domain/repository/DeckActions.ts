//What kind of actions can we do with our cards decks
import {Card} from "../entities/Card";

export interface DeckAction {
    addCard(card:Card):void;
    getTotalValue():number;
    getDeck():Card[];
}