import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * To hold utils methodss
 */
@Injectable()
export class UtilsService {

  constructor() { }

  /**
   * verify if a string can be parsed to Json
   * @param str the string
   */
  isJson(str) : boolean{
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  /**
   * 
   * @param message 
   */
  log(message : any) : void{
    if(!(environment.production))
      console.log(message);
  }

}
