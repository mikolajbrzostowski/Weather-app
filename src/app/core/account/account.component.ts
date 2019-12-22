import { User } from './../../user.model';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { ModalComponent } from 'src/app/modal/modal.component';

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
    private authService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.user = this.authService.getSignedInUser();
    this.subscription = this.authService.userChanegd.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editProfile() {
    // TODO
  }


  onDeleteAccountButtonClick() {
    // TODO WYSWIETL MODAL CZY NA PEWNO
    this.showModal(
      'Potwierdź usunięcie konta',
      ['Czy chcesz usunąć konto?'],
      'Potwierdź',
      'Anuluj',
      ModalComponent,
      { callback: this.deleteAccount.bind(this, [this.user.email]) }
    );
  }

  deleteAccount(id: number): void {
    this.authService.deleteUser(this.user);
    this.authService.logout();
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
    this.modalRef.content.onClose.subscribe(
      (result: boolean | { isConfirmed: boolean; password: string }) => {
        console.log('result: ', result);
        if (
          typeof result === 'object' &&
          result.hasOwnProperty('isConfirmed') &&
          result.hasOwnProperty('password') &&
          result.isConfirmed
        ) {
          console.log('odpalam passworda');
          result
            ? this.modalRef.content.data.callback(result.password)
            : this.modalRef.hide();
        } else if (typeof result === 'boolean') {
          console.log('odpalam regulara');
          result ? this.modalRef.content.data.callback() : this.modalRef.hide();
        }
      }
    );
  }

  showChangePasswordModal(
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
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      result ? this.modalRef.content.data.callback() : this.modalRef.hide();
    });
  }
}
