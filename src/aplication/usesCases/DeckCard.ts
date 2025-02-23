import {Player} from "../../domain/entities/Player";
import {Card} from "../../domain/entities/Card";
import {DeckAction} from "../../domain/repository/DeckActions";


export class DeckCard implements DeckAction{
    private player:Player;
    private cards:Card[];

    constructor(player:Player){
        this.player = player;
        this.cards = [];
    }

    getPlayer():Player{
        return this.player;
    }

    setCards(cards:Card[]){
        this.cards = [...cards]
    }

    addCard(card: Card): void {
        this.cards.push(card);
    }

    getDeck(): Card[] {
        return this.cards;
    }

    showCards():string{
        if(this.player.typePlayer.kind === 'dealer'){
            //Not show de last card
            return this.cards.map((card,index)=>{
                if(index === this.cards.length -1){
                    return '[hidden]';
                }else{
                    return card.type
                }
            }).toString()
        }
        return this.cards.map((card)=>{
            return card.type
        }).toString()
    }

    getTotalValue(): number {
        if(this.cards.length === 0) return 0;
        return this.cards.reduce((acc,cur) => acc + cur.value, 0);
    }
}