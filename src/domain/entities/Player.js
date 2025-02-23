"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(name, typePlayer) {
        this.name = name;
        this._typePlayer = typePlayer;
        if (this._typePlayer.kind === 'player') {
            this._typePlayer.bankRollback = 100;
        }
    }
    get typePlayer() {
        return this._typePlayer;
    }
    getBankRoll() {
        if (this._typePlayer.kind === 'player') {
            return this._typePlayer.bankRollback;
        }
        return 0;
    }
    increaseBankroll(newAmount) {
        if (this._typePlayer.kind === 'player') {
            this._typePlayer.bankRollback += newAmount;
        }
    }
    decreaseBankroll(newAmount) {
        if (this._typePlayer.kind === 'player') {
            this._typePlayer.bankRollback -= newAmount;
        }
    }
}
exports.Player = Player;
