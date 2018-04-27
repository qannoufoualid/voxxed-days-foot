import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

}
