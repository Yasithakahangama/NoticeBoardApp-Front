import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validatingRegister(credentials){
    
    if (credentials.firstName==undefined || credentials.lastName==undefined || credentials.email==undefined || credentials.password==undefined){
      return false
    }else {
      return true
    }
  }

  validatingNotice(noticeData){
    
    if (noticeData.noticeHeading==undefined || noticeData.noticeBody==undefined){
      return false
    }else {
      return true
    }
  }

  validatingEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatingPassword(password){
    const re1 = /^\S{6,10}$/;
    return re1.test(password)
  }

  validatingLogin(credentials){
    
    if (credentials.email==undefined || credentials.password==undefined){
      return false
    }else {
      return true
    }
  }
}
