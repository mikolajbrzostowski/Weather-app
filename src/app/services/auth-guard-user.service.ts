import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardUser implements CanActivate, CanActivateChild {
  constructor(private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard User');
    return 'admin' === this.userService.user.role || 'user' === this.userService.user.role;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log('AuthGuard User child');
    return 'admin' === this.userService.user.role || 'user' === this.userService.user.role;
  }
}
