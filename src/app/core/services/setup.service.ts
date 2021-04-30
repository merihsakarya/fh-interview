import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  constructor() { }

  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      // TODO: Check User has valid token and Initialize User Data.
      resolve();
    });
  }

}
