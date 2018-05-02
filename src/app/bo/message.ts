import { Data } from "./data";

export class Message {

    constructor(private _status? : string, private _action?: string, private _data?: Data[]) {}

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

    get data() : Data[]{
        return this._data;
    }

    set data(data : Data[]){
        this._data = data;
    }


    toJSON(){
        return {
            status : this.status,
            action : this.action,
            data : JSON.parse(JSON.stringify(this.data)),
        }
    }

}