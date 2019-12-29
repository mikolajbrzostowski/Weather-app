import { ModalComponent } from '../shared/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  activeUser: User;

  modalRef: BsModalRef;

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers();
  }

  createNewUser(user: User) {
    user.password = this.userService.getASecureRandomPassword();
    this.userService.emailSignup(user);
  }

  onNewUserButtonClick() {
    this.showModal('Create new user', [], 'Proceed', 'Cancel', ModalComponent, {
      callback: this.createNewUser.bind(this)
    });
  }

  showModal(
    title: string,
    list: any[],
    confirmButtonText: string,
    cancelButtonText: string,
    modal,
    data: {}
  ): void {
    const initialState = {
      title,
      list,
      confirmButtonText,
      cancelButtonText,
      data
    };

    this.modalRef = this.modalService.show(modal, { initialState });
    this.modalRef.content.onClose.subscribe((result: User | null) => {
      if (result) {
        this.modalRef.content.data.callback(result);
      }
    });
  }

  onUserClick(user: User) {
    this.activeUser = user;
  }

  generatePDF() {
    // TODO

  }



}
