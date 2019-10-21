import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-dashoard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userList = [];
  id = [];
  loginUsers = [];
  constructor(private apis: AppService,
    private toastr: ToastrService,
    private route: Router,
    public localDataService : LocalstorageService) { }

  ngOnInit() {

    /** when new user registered then live streaming */
    this.apis.addedUser.subscribe(data => {
      console.log('ehere us adata', data);
      this.toastr.success(data['message']);
      this.userList.unshift(data['data']);
      this.id.push(data['_id']);
    });

    /** counte connected user */
    this.apis.loginUser.subscribe(data => {
      if (data['status'] === 200) {
        this.loginUsers = data['data'];
      }
    });

    this.fetchUserList();
  }

  fetchUserList() {
    this.apis.getAllUser().subscribe(data => {
      this.userList = data['data'];
    });
  }

  logout() {
    this.toastr.warning('logout Successfully.');
    this.route.navigate(['/']);
    this.localDataService.removeUser();
  }

}
