//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = 'http://localhost:3000'; //http://localhost:3000

@Injectable()

export class ApiService {

    messages;
    //users 
    constructor(private http: HttpClient) {}


    getMessages() {
        this.http.get('http://localhost:3000/posts')
            .subscribe(res=>{
                console.log('response-',res);
                this.messages = res;
        })
    }
    // getUsers() {
    //     this.http.get('http://localhost:3000/users')
    //         .subscribe(res=>{
    //             console.log('response-',res);
    //             this.users = res;
    //     })
    // }

    //WORK
    // sendUserRegistretion(registerData) {
    //     this.http.post('http://localhost:3000/register', registerData)
    //         .subscribe(res=>{
    //             // console.log('response-',res);
    //             // this.messages = res;
    //     })
    // }

    //check if authentificated user
    get isAuthentificated(){
        return !!localStorage.getItem('token')
    }

    logOut() {
        localStorage.removeItem('token');
    }

    // WORK
    sendUserRegistretion(registerData) {
        console.log(registerData)
        return this.http.post(url + '/register', registerData, httpOptions).toPromise();
    }

    // sendLogin(loginData) {
    //     console.log('loginData', loginData);
    //     return this.http.post(url + '/login', loginData, httpOptions).toPromise();
    // }
 
    sendLogin(loginData) {
        //console.log('loginData', loginData);
        // httpOptions does not work -> You can specify that the data to be returned is not JSON using the responseType...
        return this.http.post(url + '/login', loginData, {responseType: 'text'}).toPromise();
    }

    getUsers() {
        return this.http.get(url + '/users').toPromise();        
    }

    getProfile(id) {
        return this.http.get(url + '/user/' + id).toPromise();
    }

}