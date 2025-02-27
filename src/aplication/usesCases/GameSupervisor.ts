import {GameActions} from "../../domain/repository/GameActions";
import {DeckCard} from "./DeckCard";
import {Card} from "../../domain/entities/Card";
import {typeCard} from "../../domain/enum/typeCard";

type StatusOfPlayer = 'hit'|'stand'| 'bust'

export class GameSupervisor implements GameActions {

    private _bet = 0;
    private _status:StatusOfPlayer = 'hit';

    constructor(public deckPlayer:DeckCard, ) {
    }

    //Check if the player has enough amount to debt
    checkPlayerBankRoll(amountToDebt:number): boolean {

        return this.deckPlayer.getPlayer().getBankRoll() >= amountToDebt;
    }

    //Returns false if the total amount of the deck is less than 21
    deckValueGreater(): boolean {
        return this.getValueOfDeck() > 21;

    }

    //TODO:Implementar la logica de las dos funciones
    getPayout(type:number = 0): number {

        switch(type){
            //Dealer busts
            case 1:
                return this._bet*2;
            //Player bet is returned (tie)
            case 2:
                return this._bet;
            //The player got black
            case 3:
                return this._bet * 1.5;
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
    get bet(): number {
        return this._bet;
    }


    setPlayerBet(betMatch: number): void {
        this._bet = betMatch;
    }

    resetBet():void{
        this._bet = 0;
    }

    getKindOfPlayer():string{
        return this.deckPlayer.getPlayer().typePlayer.kind;
    }

    showCardsPlayers(canShow?:boolean):string{
        return this.deckPlayer.showCards(canShow);
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
    setPlayerBankRoll(amountToDebt:number){
        this.deckPlayer.getPlayer().increaseBankroll(amountToDebt);
    }

    get status(): StatusOfPlayer {
        return this._status;
    }

    set status(value: StatusOfPlayer) {
        this._status = value;
    }

}