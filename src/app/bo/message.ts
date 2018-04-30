import { Data } from "./data";

export class Message {

    status: string;
    action: string;
    data: Data[];

    constructor(status? : string, action?: string, data?: Data[]) {
        this.status = status;
        this.action = action;
        this.data = data;
    }
}