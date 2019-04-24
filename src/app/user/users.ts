import { Component, OnInit } from '@angular/core';
import { UserService } from './userService'

@Component({
  selector: 'users',
  template: `<mat-list><mat-list-item *ngFor="let user of users">{{user.username}}<mat-divider></mat-divider></mat-list-item></mat-list>`
})
export class UserComponent implements OnInit {
  users: any[];
  error: any;

  constructor(private userService: UserService) { }

  getUsers() {
    this.userService
        .getUsers()
        .then(users => this.users = users)
        .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getUsers();
  }
}
