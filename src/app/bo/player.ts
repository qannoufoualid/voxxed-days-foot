
/**
 * The entity of player.
 */
export class Player{

    constructor (private _mail: string,
	private _firstName:string,
	private _lastName: string,
	private _health: number,
	private _maxHealth: number,
	private _score: number,
	private _games: number) {}

    get mail() : string{
        return this._mail;
    }

    set mail(mail : string){
        this._mail = mail;
    }

    get firstName() : string{
        return this._firstName;
    }

    set firstName(firstName : string){
        this._firstName = firstName;
    }
    
    get lastName() : string{
        return this._lastName;
    }

    set lastName(lastName : string){
        this._lastName = lastName;
    }

    get health() : number{
        return this._health;
    }

    set health(health : number){
        this._health = health;
    }

    get maxHealth() : number{
        return this._maxHealth;
    }

    set maxHealth(maxHealth : number){
        this._maxHealth = maxHealth;
    }
        
    get score() : number{
        return this._score;
    }

    set score(score : number){
        this._score = score;
    }

    get games() : number{
        return this._games;
    }

    set games(games : number){
        this._games = games;
    }

    toJSON(){
        return {
            firstName : this._firstName,
            lastName : this._lastName,
            health : this._health,
            maxHealth : this._maxHealth,
            score : this._score,
            games : this._games
        }
    }

}
