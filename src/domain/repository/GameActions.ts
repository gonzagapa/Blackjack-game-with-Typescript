//Game actions (What happen if a got 21)


import {Card} from "../entities/Card";

export interface GameActions{
    checkPlayerBankRoll(amountToDebt:number):boolean;
    deckValueGreater():boolean;
    getValueOfDeck():number;
    getPayout(type:number):number;
    setPlayerBet(bet:number):void;
}