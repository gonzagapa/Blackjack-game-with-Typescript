type TypePlayer = {
    kind:"player";
    bankRollback:number;

}
type TypeDealer = {
    kind:"dealer";
}
 type KindPlayer = TypePlayer | TypeDealer;
export type {KindPlayer};