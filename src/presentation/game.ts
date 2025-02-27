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

type GameResult = 'win'| 'loose' | 'tide';

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
        showCards(supervisorPlayer, true);
        showCards(supervisorDealer);

        //Here we enter in the hit/stand dynamic
        actionOfGames(supervisorPlayer);
        actionOfGames(supervisorDealer);
        checkWinner(supervisorPlayer,supervisorDealer)
        console.log('Players fund:' + supervisorPlayer.getPlayerBankRoll());

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
    //We have already had cards on our deck
    else{
       player.addCardtoDeck(cardsGame.pop() as Card);
   }
}

const showCards = (player:GameSupervisor, canShow?:boolean) => {

        console.log(`${player.getKindOfPlayer() === 'dealer'? `Dealer${player.status === 'hit' ? ' hit':"'s hand"}`: "Your hand"} : ${player.showCardsPlayers(canShow)} ${canShow ? `(Total:${player.getValueOfDeck()})` : ``} ${player.status === 'bust' ? '- bust': ''}`
        );
}

const actionOfGames = (player:GameSupervisor) =>{
    do{
        let action: ActionPlayer = prompt('Your action (hit/stand):').toLowerCase() as ActionPlayer;
        if(action === 'hit'){
            getCardsForPlayer(player);
            showCards(player,true);
        }else{
            player.status = 'stand'
        }

        if(player.deckValueGreater()){
           player.status = 'bust';
        }
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
        default:
            newAmount = 0;
    }
    player.setPlayerBankRoll(newAmount);
}

const checkWinner = (player:GameSupervisor, dealer:GameSupervisor) => {
    let message = '';
    let gameResult:GameResult = 'loose';
    if(player.status !== 'bust'){

        if(player.getValueOfDeck() === 21 ||
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