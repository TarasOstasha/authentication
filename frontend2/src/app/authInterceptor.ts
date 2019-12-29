import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { ApiService } from './api.service';

Injectable()

export class AuthInterceptorService implements HttpInterceptor {
    //constructor(private injector: Injector, private log: LoginComponent) {}
    constructor() {}


    intercept(req, next) {
        let auth = localStorage.getItem('token');
        let authReq = req.clone({
            headers: req.headers.set('Authorization', 'token ' + auth)
            //headers: req.headers.set('Authorization', 'token' + this.log.TOKEN_KEY)
            
        })
        return next.handle(authReq);
    }
}