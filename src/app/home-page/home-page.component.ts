import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../services/app.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userDetails: any;
  constructor(private route: Router,
    private toastr: ToastrService,
    private apis: AppService,
    public afA: AngularFireAuth,
    public localDataService: LocalstorageService) { }

  ngOnInit() {
    this.userDetails = this.localDataService.getUser();
  }

  logout() {

    if (confirm('Are you sure want to logout ?')) {
      const localData = localStorage.getItem('currunt_user');
      if (localData) {
        this.apis.logout(localData);
        this.localDataService.removeUser();
        this.route.navigate(['/']);
      }
      this.toastr.warning('Logout successfully.');

      this.afA.auth.signOut().then(() => {
        console.log('logout successsfully');
        this.route.navigate(['/']);
     });
    }
  }

}
