import { Injectable } from '@angular/core';

@Injectable()
export class Valid {
  constructor() {}

  /**
   Is not null object
   */
  isNotNull(val: any) {
    let flag = true;
    try {
      if (val) {
        flag = true;
      } else {
        flag = false;
      }
    } catch (error) {
      flag = false;
    }
    return flag;
  }

  /**
   * Is null object
   */
  isNullObject(val: any) {
    return !this.isNotNull(val);
  }
}
