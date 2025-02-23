"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
class Card {
    constructor(type, value) {
        this._type = type;
        this._value = value;
    }
    get type() {
        return `${this._type}`;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
}
exports.Card = Card;
