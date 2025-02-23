import {Card} from "../domain/entities/Card";

function shuffleArray(array:Card[]){
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        //Swap elements at index i and j
        //Learn who it is works
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export { shuffleArray };