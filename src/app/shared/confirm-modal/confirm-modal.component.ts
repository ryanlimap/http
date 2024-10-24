import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent implements OnInit {

  ngOnInit(): void {
    this.confirmResult = new Subject
  }

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  @Input() title!: string;
  @Input() msg!: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() confirmTxt = "Ok";

  confirmResult!: Subject<Boolean>;

  onConfirm() {
    this.confirmAndClose(true);
  }

  onClose() {
    this.confirmAndClose(false);
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult.next(value);

    this.bsModalRef.hide();    
  }

}
