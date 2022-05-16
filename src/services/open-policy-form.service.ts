import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenPolicyFormService {

  policyObject: any

  constructor() { }

  setObject(item: any) {
    this.policyObject = item;
  }

  resetObject() {
    this.policyObject = null;
  }
}
