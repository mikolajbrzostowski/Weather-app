import { User } from '../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<any[]>;
  userChanegd = new Subject<User>();

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) {
    this.usersCollection = this.afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
  }

  getUser(userEmail: string) {
    return this.usersCollection.doc(userEmail);
  }

  getUserById(id: string): Observable<User> {
    const userDocuments = this.afs.doc<User>('users/' + id);
    return userDocuments.snapshotChanges().pipe(
      map(changes => {
        const data = changes.payload.data();
        return { ...data };
      })
    );
  }

  setUser(user: User) {
    this.user = user;
    this.userChanegd.next(this.user);
  }


  getUsers() {
    return this.usersCollection.snapshotChanges().pipe(
      map(users => {
        return users.map(a => {
          const data = a.payload.doc.data() as User;
          data.uid = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  updateUser(user: User) {
    return this.usersCollection.doc(user.uid).set(user);
  }

  deleteCurrentUser(user: User) {
    this.afAuth.auth.currentUser
      .delete()
      .then(() => {
        return this.usersCollection.doc(user.uid).delete();
      })
      .catch(error => {
        // An error happened.
      });
  }

  deleteUser(user: User) {
    return this.usersCollection.doc(user.uid).delete();
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(userCred => {
        return this.usersCollection
          .doc(userCred.user.uid)
          .get()
          .toPromise();
      })
      .then(userDocSnap => {
        if (userDocSnap.exists) {
          this.user = userDocSnap.data() as User;
          this.user.uid = userDocSnap.id;
          this.userChanegd.next(this.user);
          this.router.navigateByUrl('');
          this.toastr.success('Successfully signed in');
        }
      })
      .catch(err => {
        this.toastr.error('Something went wrong');
        console.log('Something went wrong: ', err.message);
      });
  }

  emailSignup(newUser: User) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(
        value => {

          newUser.uid = value.user.uid;
          this.setUser(newUser);
          this.router.navigateByUrl('');
          this.toastr.success('Successfully signed up');
          return this.usersCollection.doc(value.user.uid).set(this.user);
        },
        error => {
          this.toastr.error('Something went wrong');
          console.log('Something went wrong: ', error);
        }
      );
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(result => {
        this.router.navigate(['']);
        this.toastr.success('Signed out');
        this.setUser(null);
      })
      .catch(error => {
        this.toastr.error('Error has occured');
      });
  }

  hasRole(roles: string[]): boolean {
    if (!this.user || !this.user.role) {
      return false;
    }
    return roles.some(role => this.user.role === role);
  }

  generatePassword() {
    const user = this.afAuth.auth.currentUser;
    const newPassword = this.getASecureRandomPassword();
    user
      .updatePassword(newPassword)
      .then(() => {
        // Update successful.
      })
      .catch(error => {
        // An error happened.
      });
  }

  getASecureRandomPassword() {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let retVal = '';
    for (let i = 0, n = charset.length; i < 10; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  sendPasswordResetEmail(emailAddress: string) {
    this.afAuth.auth
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        // Email sent.
      })
      .catch(error => {
        // An error happened.
      });
  }
}
