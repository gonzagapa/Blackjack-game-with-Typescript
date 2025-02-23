import {KindPlayer} from "../enum/typePlayer";

export class Player {

    private readonly name: string;
    private _typePlayer:KindPlayer;
    constructor(name: string,
                typePlayer:KindPlayer) {

        this.name = name;
        this._typePlayer = typePlayer;
        if(this._typePlayer.kind === 'player'){
             this._typePlayer.bankRollback = 100;
        }
    }

    get typePlayer(): KindPlayer {
        return this._typePlayer;
    }


    getBankRoll():number{
        if(this._typePlayer.kind === 'player'){
            return this._typePlayer.bankRollback
        }
        return 0;
    }
    increaseBankroll(newAmount:number):void{
        if(this._typePlayer.kind === 'player'){
            this._typePlayer.bankRollback += newAmount;
        }

    }

    decreaseBankroll(newAmount:number):void{
        if(this._typePlayer.kind === 'player'){
            this._typePlayer.bankRollback -= newAmount;
        }
    }
}