export class Player{

    id : number;
    pseudo : string;
    score : number;

    constructor(id: number, pseudo: string, score: number = 0) {
        this.id = id;
        this.pseudo = pseudo;
        this.score = score;
    }

}