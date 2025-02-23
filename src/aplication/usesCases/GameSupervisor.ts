import {GameActions} from "../../domain/repository/GameActions";
import {DeckCard} from "./DeckCard";
import {Card} from "../../domain/entities/Card";
import {typeCard} from "../../domain/enum/typeCard";

export class GameSupervisor implements GameActions {
    optionGame:"HIT" | "Stand"|"NONE" = 'NONE';
    statusGame: "WIN" | "LOOSE" | "STILL" =  "STILL";

    private bet = 0;

    constructor(public deckPlayer:DeckCard, ) {
    }

    //Check if the player has enough amount to debt
    checkPlayerBankRoll(amountToDebt:number): boolean {

        return this.deckPlayer.getPlayer().getBankRoll() >= amountToDebt;
    }

    //Returns false if the total amount of the deck is less than 21
    checkPlayerDeckValue(): boolean {
        let flag = false;
        if(this.getValueOfDeck() > 21){
            this.statusGame = "LOOSE";
            flag = true;
        }
        else if(this.getValueOfDeck() == 21){
            this.statusGame = "WIN";
        }else{
            this.statusGame = "STILL";
        }
        return flag;
    }

    //TODO:Implementar la logica de las dos funciones
    getPayout(type:number = 0): number {

        switch(type){
            //Dealer busts
            case 1:
                return this.bet*2;
            //Player bet is returned (tie)
            case 2:
                return this.bet;
            //The player got black
            case 3:
                return this.bet * 1.5;
            //The player got bust.
            default:
                return 0
        }
    }

    hitAnCard(): void {

    }

    getValueOfDeck(): number {
        return this.deckPlayer.getTotalValue();
    }

    setPlayerBet(betMatch: number): void {
        this.bet = betMatch;
    }

    resetBet():void{
        this.bet = 0;
    }

    showCardsPlayers(){
        return this.deckPlayer.showCards()
    }
    addCardtoDeck(Card:Card){
        if(Card.type === typeCard.A  ){
            Card.value = ((this.getValueOfDeck() - Card.value) >= 11 ) ? 11:1;
        }
        this.deckPlayer.getDeck().push(Card);
    }

    getPlayerBankRoll():number{
        return this.deckPlayer.getPlayer().getBankRoll()
    }

}