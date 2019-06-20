import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})

export class AppService {


  addedUser: Subject<any>;
  url = environment.serverUrl;
  loginUser: Subject<any>;
  logoutUser: Subject<any>;

  constructor(private webService: WebService,
    private http: HttpClient,
    public afAuth: AngularFireAuth) {

    this.addedUser = this.webService.connect();
    this.loginUser = this.webService.loginUser();
    this.logoutUser = this.webService.logoutUser();
  }

  getHeader() {
    let headers = new HttpHeaders();
    const token = JSON.parse(localStorage.getItem('currunt_user'));
    headers = headers.set('authorization', token['token']);
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }


  adminLogin(data) {
    return this.http.post(this.url + 'login', data);
  }

  login(data) {
    return this.http.post(this.url + 'login', data).pipe(
      map((res: Response) => {
        if (res['status'] === 200) {
          this.loginUser.next(res['data']);
        }
        return res;
      })
    );
  }

  registerUser(data) {
    return this.http.post(this.url + 'addUser', data).pipe(
      map((res: Response) => {
        if (res['status'] === 200) {
          if (res['data'] !== 400) {
            this.addedUser.next(res['data']);
          }
        }
        return res;
      })
    );
  }

  getAllUser() {
    return this.http.get(this.url + 'userList', { headers: this.getHeader() });
  }

  logout(data) {
    this.logoutUser.next(data);
  }


  /** Google firefase to authanticate user */
  async googleAuth() {
    const data = await this.authLogin(new auth.GoogleAuthProvider());
    return data;
  }

  authLogin(provider) {
    this.afAuth.auth.signOut();
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in.');
        return result;
      }).catch((error) => {
        console.log(error);
      });
  }

  loginViaSocialMedia(data) {
    return this.http.post(this.url + '/googleViaLogin', data).pipe(
      map((res: Response) => {
        if (res['status'] === 200) {
          this.loginUser.next(res['data']);
        }
        return res;
      })
    );
  }

  async twitterAuth() {
    const data = await this.authLogin(new auth.TwitterAuthProvider());
    return await data;
  }

  async facebookAuth() {
    const data = await this.authLogin(new auth.FacebookAuthProvider());
    return data;
  }

  async instagramAuth() {
    window.location.href = 'https://api.instagram.com/oauth/authorize/?client_id=' +
      environment.instagramConfig.clientId +
      '&redirect_uri=' + environment.instagramConfig.redirectURL + '&response_type=token';
  }

  getInstaUser(token) {
    return this.http.get('https://api.instagram.com/v1/users/self?access_token=' + token).pipe(
      map((res: Response) => res)
    );
  }

}
