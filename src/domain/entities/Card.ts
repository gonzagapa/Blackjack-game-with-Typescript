import {typeCard} from "../enum/typeCard";

export class Card{

    private _type: string;
    private _value: number;
    constructor(type:typeCard,value:number){
        this._type = type;
        this._value = value;
    }

    get type(): string {
        return `${this._type}`;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }
}