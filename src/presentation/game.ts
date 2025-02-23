import cardsForGame from "../adapters/listCars";
import {Card} from "../domain/entities/Card";
import prompSync from 'prompt-sync'
import {typeCard} from "../domain/enum/typeCard";
import {Player} from "../domain/entities/Player";
import {KindPlayer} from "../domain/enum/typePlayer";
import {shuffleArray} from "../aplication/shuffleAlgorithm";
import {DeckCard} from "../aplication/usesCases/DeckCard";
import {GameSupervisor} from "../aplication/usesCases/GameSupervisor";

type actionPlayer = 'stand'| 'hit';


const initDeckGame = (mapValues:Map<any,any>)=>{
    let cards:Card[] = [];

    //Generate 52 cards
    for(let i = 0; i<4; i++ ){
        for(let card of mapValues.keys()){
            cards.push(new Card(card, mapValues.get(card)));
        }
    }
    //console.log(cards);
    return cards;
}


const cardsGame = shuffleArray( initDeckGame(cardsForGame));
const prompt = prompSync();
const initGame = () =>{

    const typePlayer:KindPlayer = {kind:"player",bankRollback:100}
    const typeDealer:KindPlayer = {kind:"dealer"}
    //Creamos a los jugadores
    const player = new Player('Gonzalo',typePlayer);
    const dealer = new Player('Dealer',typeDealer);
    //TODO:continuar con logica del videojuego.

    //DeckCards de cada Player
    const DeckPlayer = new DeckCard(player);
    const DeckDealer = new DeckCard(dealer);

    //Los supervisores de cada jugador, quienes haran todas las operaciones
    const supervisorPlayer = new GameSupervisor(DeckPlayer);
    const supervisorDealer = new GameSupervisor(DeckDealer);

    do{
        console.log('WELCOME TO THE GAME');
        console.log(`Players fund: ${supervisorPlayer.getPlayerBankRoll()}`)


        //Checking if we can Bet
        let notPlaying = false;
        checkingBet(notPlaying,supervisorPlayer);

        //Get Dealer and Player their cards
        getCardsForPlayer(supervisorPlayer);
        getCardsForPlayer(supervisorDealer);

        //Showing the cards
        //TODO:Make a Function
        console.log(`Your hand: ${supervisorPlayer.showCardsPlayers()} (Total:${supervisorPlayer.getValueOfDeck()})`);
        console.log(`Your hand: ${supervisorDealer.showCardsPlayers()}`);

        let action: actionPlayer = prompt('Your action (hit/stand):');

        console.log('GoodBye');
        break;

    }while(supervisorPlayer.getPlayerBankRoll() > 0);
}

const checkingBet = (notPlaying:boolean, supervisorPlayer:GameSupervisor)=>{
    do {
        notPlaying = false;
        let betPlayer = parseInt(prompt('Enter your bet:'));
        if(!supervisorPlayer.checkPlayerBankRoll(betPlayer)){
            console.log("Uff, sorry you can't bet that amount, try again");
            notPlaying = true;
        }
        supervisorPlayer.setPlayerBet(betPlayer);
    }while(notPlaying)
}

const getCardsForPlayer = (player:GameSupervisor) => {
   //We have 0 cards
    //Todo: If we have a Card type A, choose the corresponding value
    if(player.getValueOfDeck() === 0){
       player.addCardtoDeck(cardsGame.pop() as Card);
       player.addCardtoDeck(cardsGame.pop() as Card);
   }
    //We have some cards on our deck
    else{
       player.addCardtoDeck(cardsGame.pop() as Card);
   }
}
export  default initGame;