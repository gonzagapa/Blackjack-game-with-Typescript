"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSupervisor = void 0;
const typeCard_1 = require("../../domain/enum/typeCard");
class GameSupervisor {
    constructor(deckPlayer) {
        this.deckPlayer = deckPlayer;
        this.optionGame = 'NONE';
        this.statusGame = "STILL";
        this.bet = 0;
    }
    //Check if the player has enough amount to debt
    checkPlayerBankRoll(amountToDebt) {
        return this.deckPlayer.getPlayer().getBankRoll() >= amountToDebt;
    }
    //Returns false if the total amount of the deck is less than 21
    checkPlayerDeckValue() {
        let flag = false;
        if (this.getValueOfDeck() > 21) {
            this.statusGame = "LOOSE";
            flag = true;
        }
        else if (this.getValueOfDeck() == 21) {
            this.statusGame = "WIN";
        }
        else {
            this.statusGame = "STILL";
        }
        return flag;
    }
    //TODO:Implementar la logica de las dos funciones
    getPayout(type = 0) {
        switch (type) {
            //Dealer busts
            case 1:
                return this.bet * 2;
            //Player bet is returned (tie)
            case 2:
                return this.bet;
            //The player got black
            case 3:
                return this.bet * 1.5;
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
    setPlayerBet(betMatch) {
        this.bet = betMatch;
    }
    resetBet() {
        this.bet = 0;
    }
    showCardsPlayers() {
        return this.deckPlayer.showCards();
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
}
exports.GameSupervisor = GameSupervisor;
