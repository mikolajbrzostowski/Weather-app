import { AccountComponent } from './core/account/account.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { UserListComponent } from './users/user-list.component';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AuthGuardUser } from './services/auth-guard-user.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuardAdmin]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuardUser]
  },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
