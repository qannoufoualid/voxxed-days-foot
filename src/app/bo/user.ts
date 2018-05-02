
/**
 * The user of the appalication.
 */
export class User{

    constructor(
    private _mail?: string,
	private _password?: string,
	private _firstName?: string,
	private _lastName?: string,
	private _contact?: boolean){}

    get mail(): string {
        return this._mail;
    }
    set mail(param: string) {
        this._mail = param;
    }
    get password(): string {
        return this._password;
    }
    set password(password: string) {
        this._password = password;
    }
    get firstName(): string {
        return this._firstName;
    }
    set firstName(param: string) {
        this._firstName = param;
    }
    get lastName(): string {
        return this._lastName;
    }
    set lastName(param: string) {
        this._lastName = param;
    }
    get contact(): boolean {
        return this._contact;
    }
    set contact(param: boolean) {
        this._contact = param;
    }

    toJSON(){
        return {
            mail : this.mail,
            password : this.password,
            firstName : this.firstName,
            lastName : this.lastName,
            contact : this.contact
        }
    }

}