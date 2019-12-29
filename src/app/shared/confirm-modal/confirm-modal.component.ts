import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) {}

  public onClose: Subject<boolean>;
  title: string;
  closeBtnName: string;
  list: any[] = [];
  confirmButtonText: string;
  cancelButtonText: string;
  data: {};

  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}
