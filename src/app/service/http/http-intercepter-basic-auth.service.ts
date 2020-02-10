import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor( private basicAuthService:BasicAuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
      let authString = this.basicAuthService.getToken()
      let user = this.basicAuthService.getUser()

      if(authString&&user)
        req = req.clone({setHeaders:{Authorization:authString}})
      return next.handle(req)
  }
}
