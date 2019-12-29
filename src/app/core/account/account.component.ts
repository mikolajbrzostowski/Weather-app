import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { User } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription;
  modalRef: BsModalRef;
  changePasswordModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.user = this.userService.user;
    this.subscription = this.userService.userChanegd.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateUser(updatedUser: User) {
    this.userService.updateUser(updatedUser).then(value =>
      this.userService.getUserById(this.user.uid).subscribe(response => {
        this.userService.setUser(response);
      })
    );
  }

  onEditButtonClick() {
    this.showModal('Edit user', [], 'Confirm', 'Cancel', ModalComponent, {
      callback: this.updateUser.bind(this),
      user: this.user
    });
  }

  onDeleteAccountButtonClick() {
    // TODO WYSWIETL MODAL CZY NA PEWNO
    this.showModal(
      'Delete account',
      ['Are you sure?'],
      'Confirm',
      'Cancel',
      ConfirmModalComponent,
      { callback: this.deleteAccount.bind(this, [this.user.email]) }
    );
  }

  deleteAccount(id: number): void {
    this.userService.deleteCurrentUser(this.user);
    this.userService.logout();
    this.modalRef.hide();
    this.router.navigate(['../'], { relativeTo: this.route });
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
    this.modalRef.content.onClose.subscribe(result => {
      // console.log('result: ', result);
      if (result) {
        this.modalRef.content.data.callback(result);
      }
    });
  }
}
