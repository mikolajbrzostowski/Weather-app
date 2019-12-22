import { User } from './../user.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { NgForm, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor(public bsModalRef: BsModalRef) {}

  public onClose: Subject<User | any>;
  title: string;
  closeBtnName: string;
  list: any[] = [];
  confirmButtonText: string;
  cancelButtonText: string;
  data: {callback: () => any, user: User};
  userForm: FormGroup;

  public ngOnInit(): void {
    this.onClose = new Subject();

    let email = '';
    let password = '';
    let firstName = '';
    let lastName = '';
    let country = '';
    let city = '';
    let role = 'user';

    if (this.data.user) {
      email = this.data.user.email;
      password = this.data.user.password;
      firstName = this.data.user.firstName;
      lastName = this.data.user.lastName;
      country = this.data.user.country;
      city = this.data.user.city;
      role = this.data.user.role;
    }

    this.userForm = new FormGroup({
      email: new FormControl(email),
      password: new FormControl(password),
      firstName: new FormControl(firstName),
      lastName: new FormControl(lastName),
      country: new FormControl(country),
      city: new FormControl(city),
      role: new FormControl(role)
    });
  }

  public onConfirm(): void {
    this.userForm.value.role = 'user';
    this.onClose.next(this.userForm.value);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }
}
