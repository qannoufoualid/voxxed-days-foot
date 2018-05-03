import { Injectable } from '@angular/core';

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
  isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

}
