import cardsForGame from "../adapters/listCars";
import {Card} from "../domain/entities/Card";
import prompSync from 'prompt-sync'
import {typeCard} from "../domain/enum/typeCard";
import {Player} from "../domain/entities/Player";
import {KindPlayer} from "../domain/enum/typePlayer";
import {shuffleArray} from "../aplication/shuffleAlgorithm";
import {DeckCard} from "../aplication/usesCases/DeckCard";
import {GameSupervisor} from "../aplication/usesCases/GameSupervisor";

type ActionPlayer = 'stand'| 'hit';

type GameResult = 'win'| 'loose' | 'tide'| 'blackjack';

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


        console.log('WELCOME TO THE GAME');
        console.log(`Players fund: ${supervisorPlayer.getPlayerBankRoll()}`)


        //Checking if we can Bet
        let notPlaying = false;
        checkingBet(notPlaying,supervisorPlayer);

        //Get Dealer and Player their cards
        getCardsForPlayer(supervisorPlayer);
        getCardsForPlayer(supervisorDealer);

        //Showing the cards
        showCards(supervisorPlayer, true);
        showCards(supervisorDealer);

        //Checking if one of them has Blackjakc
        if(hasBlackJack(supervisorPlayer) || hasBlackJack(supervisorDealer)){
            checkWinner(supervisorPlayer,supervisorDealer);
        }else{
            //Here we enter in the hit/stand dynamic
            actionOfGames(supervisorPlayer);
            showCards(supervisorDealer,true);
            actionOfGames(supervisorDealer);
            checkWinner(supervisorPlayer,supervisorDealer)
        }

        console.log('Players fund:' + supervisorPlayer.getPlayerBankRoll());

}

const hasBlackJack = (player:GameSupervisor) =>{
    if (player.getValueOfDeck() === 21 ) {
        player.status = 'blackjack';
        return true;
    }
    return false;
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
    if(player.getValueOfDeck() === 0){
       player.addCardtoDeck(cardsGame.pop() as Card);
       player.addCardtoDeck(cardsGame.pop() as Card);
   }
    //We have already had cards on our deck
    else{
       player.addCardtoDeck(cardsGame.pop() as Card);
   }
}
const showCards = (player:GameSupervisor, canShow?:boolean) => {
        let message = '';
        let messageStatus = `${player.status === 'bust' ? '- bust': player.status === 'blackjack' ? '- blackjack' : ''}`;
        if(player.getKindOfPlayer() === 'player'){
            message = `Your hand ${player.showCardsPlayers(canShow)} (Total:${player.getValueOfDeck()} ${messageStatus})`;
        }
        else{
            message = `Dealer${player.status === 'hit' ? ' hit' : "'s hand"} :  ${player.showCardsPlayers(canShow)} ${canShow ? `(Total:${player.getValueOfDeck()})` : ``} ${messageStatus}`;
        }
        console.log(message);
}

const dealerBehavior = (player:GameSupervisor):ActionPlayer => {
    if(player.getValueOfDeck() < 17){
        return 'hit';
    }
    return 'stand';
}

const actionOfGames = (player:GameSupervisor) =>{
    let action: ActionPlayer
    const isDealer = (player.getKindOfPlayer() === 'dealer');
    do{
        action =  isDealer ? dealerBehavior(player): prompt('Your action (hit/stand):').toLowerCase() as ActionPlayer;
        if(action === 'hit'){
            getCardsForPlayer(player);
            player.status = 'hit';
        }else{
            player.status = 'stand'
        }

        if(player.deckValueGreater()){
           player.status = 'bust';
        }
        showCards(player,true);
    }while(player.status === "hit"){}
}

const getMoney = (player:GameSupervisor, gameResult:GameResult) =>{
    let newAmount
    switch (gameResult){
        case 'win':
            newAmount = player.bet;
            break;
        case 'loose':
            newAmount = -player.bet;
            break;
        case 'blackjack':
            newAmount = player.bet * 1.5;
            break
        default:
            newAmount = 0;
    }
    player.setPlayerBankRoll(newAmount);
}

const checkWinner = (player:GameSupervisor, dealer:GameSupervisor) => {
    let message = '';
    let gameResult:GameResult = 'loose';

    if(player.status === 'blackjack'){
        gameResult = 'blackjack'
    }

    //We have a tide
    else if(player.status === 'bust' && dealer.status === 'bust'){
        gameResult = 'tide';
    }

    else if(player.status !== 'bust'){

        if(player.getValueOfDeck() === 21||
            dealer.status === 'bust' ||
            player.getValueOfDeck() > dealer.getValueOfDeck()
            ){
            message = `Your win ${player.bet}`;
            gameResult = 'win';
        }
        else if(player.getValueOfDeck() === dealer.getValueOfDeck()){
            message = `It's a push, your bet is returned: ${player.bet}`;
            gameResult = 'tide';
        }
        else{
            message = `Dealer wins, You lose:  ${player.bet}`
        }

    }else{
       message = `You're bust and lose ${player.bet} `;
    }

    console.log(`${message}`);
    getMoney(player,gameResult);
}


export  default initGame;