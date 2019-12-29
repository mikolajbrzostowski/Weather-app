import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription;
  navbarOpen = false;
  constructor(private authService: UserService) {}

  ngOnInit(): void {
    this.user = this.authService.user;
    this.subscription = this.authService.userChanegd.subscribe((user: User) => {
      this.user = user;
    });
    console.log('Logged in: ' + this.user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
