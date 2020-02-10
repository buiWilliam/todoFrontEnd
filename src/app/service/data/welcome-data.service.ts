import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { API_URL } from 'src/app/app.constant';

export class helloWorldBean{
  constructor(public message:string){

  }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  executeHelloWorld(name){
    return this.http.get<helloWorldBean>(`${API_URL}/hello/path-variable/${name}`)
  }
}
