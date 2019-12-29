import { HasRoleDirective } from './shared/hasRole.directive';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UserItemComponent } from './users/user-item/user-item.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { SigninComponent } from './signin/signin.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { AccountComponent } from './core/account/account.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgXBootstrapModule } from './shared/ngx-bootstrap/ngx-bootstrap.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { FooterComponent } from './core/footer/footer.component';
import { UserListComponent } from './users/user-list.component';
import { WeatherComponent } from './weather/weather.component';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AuthGuardUser } from './services/auth-guard-user.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AccountComponent,
    ModalComponent,
    SigninComponent,
    SignupComponent,
    FooterComponent,
    UserListComponent,
    UserItemComponent,
    WeatherComponent,
    ConfirmModalComponent,
    HasRoleDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgXBootstrapModule,
    BsDatepickerModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center' }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [AngularFirestore, AuthGuardAdmin, AuthGuardUser],
  entryComponents: [ModalComponent, ConfirmModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
