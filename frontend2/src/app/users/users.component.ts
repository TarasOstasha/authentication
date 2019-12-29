import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  users = []

  ngOnInit() {
    //this.apiService.getUsers();
    this.allUsers()
  }

  async allUsers() {
    try {
      const fromServer = await this.apiService.getUsers();
      const usersArrFromDB = Object.values(fromServer); // create array from obj
      usersArrFromDB.map(item=>{
        //console.log('this is item email from map- ', item[1].email)
        //console.log('this is item name from map- ', item[1].name)
        console.log(item)
        this.users.push({
          name: item.name,
          email: item.email  ,
          _id: item._id
        })
      })
    } catch (error) {
      console.log(error);
    }
  }
  test() {
    console.log(this)
  }

}
