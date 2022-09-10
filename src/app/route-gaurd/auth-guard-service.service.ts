import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService {

  constructor() { }

  getToken(){  
    return !!localStorage.getItem("token");  
    } 

  getUserId(){  
      return !!localStorage.getItem("userId");  
      } 
}
