"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSupervisor = void 0;
const typeCard_1 = require("../../domain/enum/typeCard");
class GameSupervisor {
    constructor(deckPlayer) {
        this.deckPlayer = deckPlayer;
        this._bet = 0;
        this._status = 'hit';
    }
    //Check if the player has enough amount to debt
    checkPlayerBankRoll(amountToDebt) {
        return this.deckPlayer.getPlayer().getBankRoll() >= amountToDebt;
    }
    //Returns false if the total amount of the deck is less than 21
    deckValueGreater() {
        return this.getValueOfDeck() > 21;
    }
    //TODO:Implementar la logica de las dos funciones
    getPayout(type = 0) {
        switch (type) {
            //Dealer busts
            case 1:
                return this._bet * 2;
            //Player bet is returned (tie)
            case 2:
                return this._bet;
            //The player got black
            case 3:
                return this._bet * 1.5;
            //The player got bust.
            default:
                return 0;
        }
    }
    hitAnCard() {
    }
    getValueOfDeck() {
        return this.deckPlayer.getTotalValue();
    }
    get bet() {
        return this._bet;
    }
    setPlayerBet(betMatch) {
        this._bet = betMatch;
    }
    resetBet() {
        this._bet = 0;
    }
    getKindOfPlayer() {
        return this.deckPlayer.getPlayer().typePlayer.kind;
    }
    showCardsPlayers(canShow) {
        return this.deckPlayer.showCards(canShow);
    }
    addCardtoDeck(Card) {
        if (Card.type === typeCard_1.typeCard.A) {
            Card.value = ((this.getValueOfDeck() - Card.value) >= 11) ? 11 : 1;
        }
        this.deckPlayer.getDeck().push(Card);
    }
    getPlayerBankRoll() {
        return this.deckPlayer.getPlayer().getBankRoll();
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
}
exports.GameSupervisor = GameSupervisor;
