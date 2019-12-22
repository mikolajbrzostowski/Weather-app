import { ConfirmModalComponent } from './../confirm-modal/confirm-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/modal/modal.component';
import { User } from './../user.model';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  @Input() user: User;
  modalRef: BsModalRef;

  constructor(
    private userService: UserService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {}

  updateUser(updatedUser: User) {
    this.userService.updateUser(updatedUser);
  }

  delete() {
    this.userService.deleteUser(this.user);
  }

  editUser() {
    this.showModal('Edit user', [], 'Confirm', 'Cancel', ModalComponent, {
      callback: this.updateUser.bind(this),
      user: this.user
    });
  }

  deleteUser() {
    this.showModal('Delete user', ['Are you sure???'], 'Confirm', 'Cancel', ConfirmModalComponent, {
      callback: this.delete.bind(this)
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
    this.modalRef.content.onClose.subscribe((result) => {
      console.log('result: ', result);
      if (result) {
        this.modalRef.content.data.callback(result);
      }
    });
  }
}
