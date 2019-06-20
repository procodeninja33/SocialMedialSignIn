import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: FormGroup;

  constructor(private apis: AppService,
    private _formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.formBuild();
    this.router.fragment.subscribe(data => {
      if (data) {
        const params = data.split('=')[1];
        JSON.stringify(params);
        this.apis.getInstaUser(params).subscribe(userData => {
          console.log(userData);
          const submitData = {
            email: userData['data'].username,
            name: userData['data'].full_name
          };
          this.socialMediaLogin(submitData);
        });
      }
    });
  }

  statusChangeCallback(response: any) {
    if (response.status === 'connected') {
      console.log('connected');
    } else {
      this.loginWithFacebook();
    }
  }

  formBuild() {
    this.userLogin = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.userLogin.invalid) {
      return;
    }

    this.apis.login(this.userLogin.value).subscribe(data => {
      if (data['status'] === 200) {
        this.toastr.success(data['message']);
        this.route.navigate(['home']);
        localStorage.setItem('currunt_user', JSON.stringify(data['data']));
      } else {
        this.toastr.error(data['message']);
      }
    });
  }

  loginWithGoogle() {
    this.apis.googleAuth().then(data => {
      if (data !== undefined) {
        const userData = {
          name: data['additionalUserInfo'].profile.given_name,
          email: data['additionalUserInfo'].profile.email
        };
        this.socialMediaLogin(userData);
      }
    });
  }


  loginWithFacebook() {
    this.apis.facebookAuth().then(responseData => {
      console.log('here is responseData', responseData);
      if (responseData !== undefined) {
        const userData = {
          name: responseData['additionalUserInfo'].profile.first_name,
          email: responseData['additionalUserInfo'].profile.email
        };
        this.socialMediaLogin(userData);
      }
    });
  }

  loginWithTwitter() {
    this.apis.twitterAuth().then(responseData => {
      if (responseData !== undefined) {
        const userData = {
          name: responseData['additionalUserInfo'].profile.name,
          email: responseData['additionalUserInfo'].profile.email
        };
        this.socialMediaLogin(userData);
      }
    });
  }

  loginWithInstagram() {
    this.apis.instagramAuth().then(data => {
      console.log('here is data', data);
    });
  }

  socialMediaLogin(userData) {
    this.apis.registerUser(userData).subscribe(newData => {
      if (newData['status'] === 200) {
        this.apis.loginViaSocialMedia({ email: userData.email }).subscribe(loginData => {
          if (loginData['status'] === 200) {
            localStorage.setItem('currunt_user', JSON.stringify(loginData['data']));
            this.route.navigate(['/home']);
          } else {
            this.toastr.error(loginData['message']);
          }
        });
      } else {
        this.toastr.error(newData['message']);
      }
    });
  }
}
