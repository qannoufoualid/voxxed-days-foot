
/**
 * The data of the message.
 */
export class Data {

    constructor(private _key: string, private _value: any) {}

    get key(): string {
        return this._key;
    }
    set key(value: string) {
        this._key = value;
    }
    get value(): any {
        return this._value;
    }
    set value(value: any) {
        this._value = value;
    }

    toJSON() {
        return {
          key: this.key,
          value : this.value
        }
      }

}