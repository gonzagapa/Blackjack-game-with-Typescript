# BlackJack Game Console Application with TS

A console-based BlackJack game implemented in **TypeScript** and using a folder structure based on **Clean architecture**.

## Features

- Play against a computer dealer.
- Simple command-line interface.

## Game Rules

1. The game is played with a standard 52-card deck.

2. If the players's initial two cards total 21, this is a "Blackjack", and the player wins 3:2 on their bet automatcally, unless the dealer also has a Blackjack, in which case the game ends.

3. Player can choose to Hit (request another card) or Stand (end their turn).

4. If the player's hand is closer to 21 than the dealer's hand without exceeding 21, the player wins and doubles their bet.

5. If the dealer has a higer total than the player wihout exceeding 21, the player loses their bet.

6. If both the player and the dealer have the same total, the game is a "Push" (tie), and the player's bet is returned.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/download) (version 18 or higher recommended).

## Installation

1.Clone the repository:

```bash
git clone https://github.com/gonzagapa/Blackjack-game-with-Typescript.git
```

2.Navigate to the project directory

```bash
cd Blackjack-game-with-TS
```

3.Install dependencies:

```bash
npm install
```

4.Run the application:

```bash
npm start
```

---

**Have fun playing and feel free to contribute with any suggestions or improvements!** 🧑‍💻
