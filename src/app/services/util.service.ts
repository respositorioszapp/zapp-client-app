import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  /**
   * This function is for convert an object to 
   * @param object 
   */
  convertObjectToArray(object) : any[] {
    let arr = [];
    Object.keys(object).map(function (key) {
      arr.push({ ...object[key] })
      return arr;
    });
    return arr;
  }
}
