import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { UsersComponent } from '../users/users.component'
import { ActivatedRoute } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const url = 'http://localhost'; //http://localhost:3000




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  user: any = {}
  constructor(
    private apiService: ApiService, 
    private http: HttpClient, 
    private toastr: ToastrService,
    private route: ActivatedRoute

   ) { }

  async ngOnInit() {
    this.getUser()
  }

  async getUser() {
    try {
      let id = this.route.snapshot.paramMap.get('id');
      this.user = await this.apiService.getProfile(id);
      console.log('Users', this.user)
        //const fromServer = await this.apiService.sendLogin(this.loginData); //move data to api service - work
        // console.log(fromServer, ' - fromServer');
        // this.toastr.success('Succsess Login');
        // localStorage.setItem('token', fromServer);
    } catch (error) {
        this.toastr.error('ERORR, There is no user registered');

    }
  }


}





