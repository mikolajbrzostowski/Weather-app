import { UserItemComponent } from './users/user-item/user-item.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { SigninComponent } from './signin/signin.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { AccountComponent } from './core/account/account.component';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgXBootstrapModule } from './ngx-bootstrap/ngx-bootstrap.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { FooterComponent } from './core/footer/footer.component';
import { UserListComponent } from './users/user-list.component';
import { WeatherComponent } from './weather/weather.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

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
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgXBootstrapModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center' }),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AngularFirestore],
  entryComponents: [ModalComponent, ConfirmModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
