import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  UserListName = 'currunt_user';
  constructor() { }

  getUser() {
    return JSON.parse(localStorage.getItem(this.UserListName));
  }

  addUser(data) {
    return (localStorage.setItem(this.UserListName, JSON.stringify(data)));
  }

  removeUser() {
    return localStorage.removeItem(this.UserListName);
  }
}
