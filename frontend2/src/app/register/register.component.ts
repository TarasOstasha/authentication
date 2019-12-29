import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const url = 'http://localhost'; //http://localhost:3000


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
  //styleUrls: ['./register.component.less']
})

export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  user = {
    name: '',
    email: '',
    password: ''
    //role: 'Guest',
    //notes: null
  };

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {
    const pwdValidators: ValidatorFn[] = [Validators.required, Validators.minLength(6), Validators.maxLength(20)];

    // !important info -> if you are going to user formBuilder.group you cant use [(ngModel)]
    this.userForm = this.formBuilder.group({
      'name': [this.user.name, [Validators.required, Validators.minLength(3)]],
      'email': [this.user.email, [Validators.required, Validators.minLength(5), this.mailValidator()]],
      'password':[this.user.password, pwdValidators]
      // 'role': [this.user.role, [Validators.required]],
      // 'notes': [this.user.notes, [Validators.maxLength(45)]]
    });
  }
    //check email
    private mailValidator(): ValidatorFn {
      const error_message = { mailValidator: { msg: `Invalid email` } };
      const pattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return (control: AbstractControl) => {
        const isValid = pattern.test(control.value);
        return isValid ? null : error_message
      }
  
    }

  //registerData = {}// it is not require to put name, email, password

  ngOnInit() { }

  //this method is working!!!
  //   post() {
  //       console.log(this.registerData);
  //       this.ApiService.sendUserRegistretion(this.registerData);
  //   }


  //NOR WORKs
  async registerUser() {
    try {
      const registerData = {
        name: this.userForm.controls.name.value,
        email: this.userForm.controls.email.value,
        password: this.userForm.controls.password.value
      }
      console.log(registerData, '- registerData') // working correct
      // checked validation
      if(!this.userForm.valid) {
        this.toastr.error('Please fill out the form!');
        return
      } else {
        const fromServer = await this.apiService.sendUserRegistretion(registerData); //move data to api service - work
        
        //localStorage.setItem('token', fromServer);  // don't understand why token does not work???
               
        console.log(fromServer, '- this is fromServer -');
        this.toastr.success('Your profile has been created, Have fun!');
        this.userForm.reset()
      }
    } catch (error) {
      console.log('there is some err on server', error);
      this.toastr.error('error, please try again');
    }
  }

}
