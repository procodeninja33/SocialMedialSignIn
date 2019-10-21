import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private route: Router,
    public localService: LocalstorageService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userDetail = this.localService.getUser();
    if (userDetail) {
      return true;
    } else {
      this.route.navigate(['/']);
    }
  }
}
