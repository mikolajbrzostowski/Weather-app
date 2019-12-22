import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { User } from 'src/app/user.model';
import { UserService } from 'src/app/user.service';

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
    this.user = this.authService.getSignedInUser();
    this.subscription = this.authService.userChanegd.subscribe((user: User) => {
      this.user = user;
    });
    console.log('Przypisuję usera: ' + this.user);
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
