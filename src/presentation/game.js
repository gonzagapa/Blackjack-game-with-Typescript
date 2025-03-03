"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listCars_1 = __importDefault(require("../adapters/listCars"));
const Card_1 = require("../domain/entities/Card");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const Player_1 = require("../domain/entities/Player");
const shuffleAlgorithm_1 = require("../aplication/shuffleAlgorithm");
const DeckCard_1 = require("../aplication/usesCases/DeckCard");
const GameSupervisor_1 = require("../aplication/usesCases/GameSupervisor");
const initDeckGame = (mapValues) => {
    let cards = [];
    //Generate 52 cards
    for (let i = 0; i < 4; i++) {
        for (let card of mapValues.keys()) {
            cards.push(new Card_1.Card(card, mapValues.get(card)));
        }
    }
    //console.log(cards);
    return cards;
};
const cardsGame = (0, shuffleAlgorithm_1.shuffleArray)(initDeckGame(listCars_1.default));
const prompt = (0, prompt_sync_1.default)();
const initGame = () => {
    const typePlayer = { kind: "player", bankRollback: 100 };
    const typeDealer = { kind: "dealer" };
    //Creamos a los jugadores
    const player = new Player_1.Player('Gonzalo', typePlayer);
    const dealer = new Player_1.Player('Dealer', typeDealer);
    //TODO:continuar con logica del videojuego.
    //DeckCards de cada Player
    const DeckPlayer = new DeckCard_1.DeckCard(player);
    const DeckDealer = new DeckCard_1.DeckCard(dealer);
    //Los supervisores de cada jugador, quienes haran todas las operaciones
    const supervisorPlayer = new GameSupervisor_1.GameSupervisor(DeckPlayer);
    const supervisorDealer = new GameSupervisor_1.GameSupervisor(DeckDealer);
    console.log('WELCOME TO THE GAME');
    console.log(`Players fund: ${supervisorPlayer.getPlayerBankRoll()}`);
    //Checking if we can Bet
    let notPlaying = false;
    checkingBet(notPlaying, supervisorPlayer);
    //Get Dealer and Player their cards
    getCardsForPlayer(supervisorPlayer);
    getCardsForPlayer(supervisorDealer);
    //Showing the cards
    showCards(supervisorPlayer, true);
    showCards(supervisorDealer);
    //Checking if one of them has Blackjakc
    if (hasBlackJack(supervisorPlayer) || hasBlackJack(supervisorDealer)) {
        checkWinner(supervisorPlayer, supervisorDealer);
    }
    else {
        //Here we enter in the hit/stand dynamic
        actionOfGames(supervisorPlayer);
        showCards(supervisorDealer, true);
        actionOfGames(supervisorDealer);
        checkWinner(supervisorPlayer, supervisorDealer);
    }
    console.log('Players fund:' + supervisorPlayer.getPlayerBankRoll());
};
const hasBlackJack = (player) => {
    if (player.getValueOfDeck() === 21) {
        player.status = 'blackjack';
        return true;
    }
    return false;
};
const checkingBet = (notPlaying, supervisorPlayer) => {
    do {
        notPlaying = false;
        let betPlayer = parseInt(prompt('Enter your bet:'));
        if (!supervisorPlayer.checkPlayerBankRoll(betPlayer)) {
            console.log("Uff, sorry you can't bet that amount, try again");
            notPlaying = true;
        }
        supervisorPlayer.setPlayerBet(betPlayer);
    } while (notPlaying);
};
const getCardsForPlayer = (player) => {
    //We have 0 cards
    if (player.getValueOfDeck() === 0) {
        player.addCardtoDeck(cardsGame.pop());
        player.addCardtoDeck(cardsGame.pop());
    }
    //We have already had cards on our deck
    else {
        player.addCardtoDeck(cardsGame.pop());
    }
};
//TODO:Refactoring
const showCards = (player, canShow) => {
    let message = '';
    let messageStatus = `${player.status === 'bust' ? '- bust' : player.status === 'blackjack' ? '- blackjack' : ''}`;
    if (player.getKindOfPlayer() === 'player') {
        message = `Your hand ${player.showCardsPlayers(canShow)} (Total:${player.getValueOfDeck()} ${messageStatus})`;
    }
    else {
        message = `Dealer${player.status === 'hit' ? ' hit' : "'s hand"} :  ${player.showCardsPlayers(canShow)} ${canShow ? `(Total:${player.getValueOfDeck()})` : ``} ${messageStatus}`;
    }
    console.log(message);
};
const dealerBehavior = (player) => {
    if (player.getValueOfDeck() < 17) {
        return 'hit';
    }
    return 'stand';
};
const actionOfGames = (player) => {
    let action;
    const isDealer = (player.getKindOfPlayer() === 'dealer');
    do {
        action = isDealer ? dealerBehavior(player) : prompt('Your action (hit/stand):').toLowerCase();
        if (action === 'hit') {
            getCardsForPlayer(player);
            player.status = 'hit';
        }
        else {
            player.status = 'stand';
        }
        if (player.deckValueGreater()) {
            player.status = 'bust';
        }
        showCards(player, true);
    } while (player.status === "hit");
    { }
};
const getMoney = (player, gameResult) => {
    let newAmount;
    switch (gameResult) {
        case 'win':
            newAmount = player.bet;
            break;
        case 'loose':
            newAmount = -player.bet;
            break;
        case 'blackjack':
            newAmount = player.bet * 1.5;
            break;
        default:
            newAmount = 0;
    }
    player.setPlayerBankRoll(newAmount);
};
const checkWinner = (player, dealer) => {
    let message = '';
    let gameResult = 'loose';
    if (player.status === 'blackjack') {
        gameResult = 'blackjack';
    }
    //We have a tide
    else if (player.status === 'bust' && dealer.status === 'bust') {
        gameResult = 'tide';
    }
    else if (player.status !== 'bust') {
        if (player.getValueOfDeck() === 21 ||
            dealer.status === 'bust' ||
            player.getValueOfDeck() > dealer.getValueOfDeck()) {
            message = `Your win ${player.bet}`;
            gameResult = 'win';
        }
        else if (player.getValueOfDeck() === dealer.getValueOfDeck()) {
            message = `It's a push, your bet is returned: ${player.bet}`;
            gameResult = 'tide';
        }
        else {
            message = `Dealer wins, You lose:  ${player.bet}`;
        }
    }
    else {
        message = `You're bust and lose ${player.bet} `;
    }
    console.log(`${message}`);
    getMoney(player, gameResult);
};
exports.default = initGame;
