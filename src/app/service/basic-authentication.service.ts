import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { API_URL } from '../app.constant';

export const TOKEN = "token"
export const AUTHENTICATED_USER = "loggedIn"

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http:HttpClient) { }

  authenticateBasic(name,password){
    let basicAuthString = "Basic "+ window.btoa(name+":"+password)
    let header = new HttpHeaders({
      Authorization: basicAuthString
    })
    return this.http.get<AuthenticationBean>(`${API_URL}/basicAuth`,{headers:header}).pipe(
      map(data=>{
        sessionStorage.setItem(AUTHENTICATED_USER,name)
        sessionStorage.setItem(TOKEN,basicAuthString)
        return data
    }))
  }

  authenticateJWT(username,password){
    return this.http.post<any>(`${API_URL}/authenticate`,{username,password}).pipe(
      map(data=>{
        sessionStorage.setItem(AUTHENTICATED_USER,username)
        sessionStorage.setItem(TOKEN,`Bearer ${data.token}`)
        return data
    }))
  }


  getUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getToken(){
    if(this.isUserLoggedIn())
    return sessionStorage.getItem(TOKEN)
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user===null)
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }
}

export class AuthenticationBean {
  constructor(public message: String){}
}