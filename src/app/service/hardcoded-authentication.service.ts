import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username, password){
    if(username==="admin"&&password==="404password"){
      sessionStorage.setItem("loggedIn",username)
      sessionStorage.setItem("token","eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbjI4bWludXRlcyIsImV4cCI6MTU4MTcyNTMxMywiaWF0IjoxNTgxMTIwNTEzfQ.uQ32YdDLf4cy3LgT3xRvwF3tk2PMUvM-a68DeL9Y-sogX03thV2szfEzuWczWebJZBzBp8c9O4eUG0SZNn6bBA")
      return true
    }
    else
    return false
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem("loggedIn")
    return !(user===null)
  }

  logout(){
    sessionStorage.removeItem("loggedIn")
    sessionStorage.removeItem("token")
  }
}
