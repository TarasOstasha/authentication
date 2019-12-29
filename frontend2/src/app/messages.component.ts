import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'messages',
  template: `
    <button>click me</button>
    <div class="card" *ngFor="let message of ApiService.messages">
        <div class="card-post">{{message.message}}</div>
    </div>
    
  `,
  styleUrls: ['./app.component.less']
})
export class MessagesComponent {
  title = 'frontend tonyjoss';
  constructor(private ApiService: ApiService) {}

  ngOnInit() {
    this.ApiService.getMessages();
  }
}
