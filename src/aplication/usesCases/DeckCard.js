"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeckCard = void 0;
class DeckCard {
    constructor(player) {
        this.player = player;
        this.cards = [];
    }
    getPlayer() {
        return this.player;
    }
    setCards(cards) {
        this.cards = [...cards];
    }
    addCard(card) {
        this.cards.push(card);
    }
    getDeck() {
        return this.cards;
    }
    showCards(canShow) {
        if (this.player.typePlayer.kind === 'dealer' && !canShow) {
            //Not show de last card
            return this.cards.map((card, index) => {
                if (index === this.cards.length - 1) {
                    return '[hidden]';
                }
                else {
                    return card.type;
                }
            }).toString();
        }
        return this.cards.map((card) => {
            return card.type;
        }).toString();
    }
    getTotalValue() {
        if (this.cards.length === 0)
            return 0;
        return this.cards.reduce((acc, cur) => acc + cur.value, 0);
    }
}
exports.DeckCard = DeckCard;
