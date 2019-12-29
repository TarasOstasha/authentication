import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { from } from 'rxjs';
import { MessagesComponent } from '../app/messages.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthInterceptorService } from './authInterceptor'


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    RegisterComponent,
    LoginComponent,
    MainComponent,
    UsersComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    MatSliderModule
    // ToastrModule added
    // ToastrModule.forRoot({
    //   timeOut: 100000,
    //   positionClass: 'toast-bottom-right',
    //   preventDuplicates: true,
    // })
  ],
  providers: [ApiService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
