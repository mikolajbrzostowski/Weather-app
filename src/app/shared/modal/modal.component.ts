import { User } from '../../models/user.model';
import { Component, OnInit, TemplateRef, ViewChild, Renderer2 } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private renderer: Renderer2
  ) {}

  public onClose: Subject<User | any>;
  title: string;
  closeBtnName: string;
  list: any[] = [];
  confirmButtonText: string;
  cancelButtonText: string;
  data: { callback: () => any; user: User };
  userForm: FormGroup;
  @ViewChild('passwordInput') passwordInput;
  @ViewChild('passwordEye') passwordEye;

  public ngOnInit(): void {
    this.onClose = new Subject();

    let uid = '';
    let email = '';
    let password = '';
    let firstName = '';
    let lastName = '';
    let country = '';
    let city = '';
    let role = '';

    if (this.data.user) {
      uid = this.data.user.uid;
      email = this.data.user.email;
      password = this.data.user.password;
      firstName = this.data.user.firstName;
      lastName = this.data.user.lastName;
      country = this.data.user.country;
      city = this.data.user.city;
      role = this.data.user.role;
    }

    this.userForm = new FormGroup({
      uid: new FormControl(uid),
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
    this.onClose.next(this.userForm.value);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }

  generatePassword() {
    this.passwordInput.nativeElement.value = this.userService.getASecureRandomPassword();
  }

  showPassword() {
    if (this.passwordInput.nativeElement.type !== 'text') {
      this.passwordInput.nativeElement.type = 'text';
      this.renderer.addClass(this.passwordEye.nativeElement, 'fa-eye');
      this.renderer.removeClass(this.passwordEye.nativeElement, 'fa-eye-slash');
    } else {
      this.passwordInput.nativeElement.type = 'password';
      this.renderer.addClass(this.passwordEye.nativeElement, 'fa-eye-slash');
      this.renderer.removeClass(this.passwordEye.nativeElement, 'fa-eye');
    }
  }
}
