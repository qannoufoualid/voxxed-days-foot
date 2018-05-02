/**
 * The message that can be exchaanged between the client and the server..
 */
export class Message {

    constructor(private _status? : string, private _action?: string, private _data?: any, private _token? : string) {}

    get status() : string{
        return this._status;
    }

    set status(status : string){
        this._status = status;
    }

    get action() : string{
        return this._action;
    }

    set action(action : string){
        this._action = action;
    }

    get data() : any{
        return this._data;
    }

    set data(data : any){
        this._data = data;
    }

    get token() : string{
        return this._token;
    }

    set token(token : string){
        this._token = token;
    }

    toJSON(){
        return {
            status : this.status,
            action : this.action,
            data : this.data,
            token : this.token
        }
    }

}