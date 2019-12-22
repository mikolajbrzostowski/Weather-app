import { User } from './user.model';
import { ApiService } from 'src/app/api.service';
import { ResponseWrapper } from '../app/responseWrapper.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Role } from './role.enum';
import { Subject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private signedInUser: User;
  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<any[]>;
  userChanegd = new Subject<User>();
  url = 'siema';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private fireAuth: AngularFirestore,
    private toastr: ToastrService
  ) {
    this.usersCollection = this.fireAuth.collection<User>('users');
    console.log('UserService');
    this.users = this.usersCollection.valueChanges();
  }

  createUser(user: User) {
    return this.usersCollection.add(user);
  }

  getUsers() {
    return this.usersCollection.valueChanges();
  }

  updateUser(user: User) {
    return this.usersCollection.doc(user.email).set(user);
  }

  deleteUser(user: User) {
    return this.usersCollection.doc(user.email).delete();
  }

  getSignedInUserRole(): Role {
    return Role[this.signedInUser.getRole().toLocaleUpperCase()];
  }

  setSignedInUser(user: User): User {
    this.signedInUser = user;
    console.log('Signed in: ' + this.signedInUser.getEmail());
    this.userChanegd.next(this.signedInUser);
    return this.signedInUser;
  }

  signup(
    email: string,
    password: string,
    role: string,
    firstName: string,
    lastName: string,
    country: string,
    city: string
  ) {
    this.apiService
      .post<ResponseWrapper<User>>(this.url + 'signup/user', {
        email,
        password,
        role,
        firstName,
        lastName,
        country,
        city
      })
      .subscribe(
        response => {
          if (response && response.isSuccess) {
            console.log(response);
            this.toastr.success(
              'Rejestracja przebiegła pomyślnie, możesz się zalogować.'
            );
          }
          this.router.navigate(['']);
        },
        err => {
          console.log(err);
          this.toastr.error('Błąd rejestracji, spróbuj ponownie.');
          // Wyswietl błąd REJESTRACJI
        }
      );
  }

  signin(email: string, password: string): void {
    this.apiService
      .post<ResponseWrapper<User>>(this.url + 'login', { email, password })
      .subscribe(
        (rw: ResponseWrapper<User>) => {
          if (rw && rw.isSuccess) {
            this.setSignedInUser(rw.data);
            this.toastr.success('Zalogowano');
            this.router.navigate(['']);
          } else {
            console.log('login error');
            this.toastr.error('Błąd logowania, spróbuj ponownie.');
          }
        },
        err => {
          console.log(err);
          this.toastr.error('Błąd logowania.');
        }
      );
  }

  logout() {
    this.apiService
      .post<ResponseWrapper<User>>(this.url + 'logout', {
        user: this.signedInUser
      })
      .subscribe(
        (rw: ResponseWrapper<User>) => {
          if (rw && rw.isSuccess) {
            this.signedInUser = null;
            this.userChanegd.next(this.signedInUser);
            this.router.navigate(['']);
            this.toastr.success('Wylogowano');
          }
        },
        err => {
          console.log(err);
          // Wyswietl błąd wylogowania
        }
      );
  }

  hasRole(roles: string[]): boolean {
    if (!this.signedInUser || !this.signedInUser.getRole()) {
      return false;
    }
    return roles.some(role => this.signedInUser.getRole() === role);
  }

  getSignedInUser(): User {
    return this.signedInUser;
  }

  generatePassword() {
    // TODO
  }
}
