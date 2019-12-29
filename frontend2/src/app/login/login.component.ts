import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const url = 'http://localhost'; //http://localhost:3000


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {
  userForm: any;
  loginForm: any;
    constructor( 
        private apiService: ApiService, 
        private http: HttpClient, 
        private toastr: ToastrService
    ) { }

    loginData = {
        email: '',
        password: ''
    }

    ngOnInit() { }


    // WORK
    async login() {
        try {
            const fromServer = await this.apiService.sendLogin(this.loginData); //move data to api service - work
  // if (this.loginData.email || this.loginData.password !== '') return ;
            console.log(fromServer, ' - fromServer LOGIN'); // get token on the front end
            this.toastr.success('Succsess Login');
            this.clearInputs();
            //this.setToken()
            localStorage.setItem('token', fromServer);
        } catch (error) {
            console.log('there is some err on server', error);
            this.toastr.error('ERORR, There is no user registered');

        }
    }

    clearInputs() {
        this.loginData.email = '';
        this.loginData.password = ''
    }
}
