//Game actions (What happen if a got 21)


import {Card} from "../entities/Card";

export interface GameActions{
    checkPlayerBankRoll(amountToDebt:number):boolean;
    checkPlayerDeckValue():boolean;
    getValueOfDeck():number;
    hitAnCard():void;
    getPayout(type:number):number;
    setPlayerBet(bet:number):void;
    statusGame:"WIN"|"LOOSE"|"STILL";
    optionGame: "HIT" | "Stand"|"NONE" ;
}