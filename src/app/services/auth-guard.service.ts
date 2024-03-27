import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private route: ActivatedRoute) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      localStorage.clear();
      sessionStorage.clear();
      return false;
    } else {
      return true;
    }
  }
}
