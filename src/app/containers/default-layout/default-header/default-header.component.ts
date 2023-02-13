import { animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Clipboard} from '@angular/cdk/clipboard';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
  styles: [	`
  .dark-modal .modal-content {
    background-color: #292b2c;
    color: white;
  }
  .dark-modal .close {
    color: white;
  }
  .light-blue-backdrop {
    background-color: #5cb3fd;
  }`,]
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  textControl!: FormControl;
  constructor(private classToggler: ClassToggleService, private modalService: NgbModal, 
     private clipboard: Clipboard) {
    super();
    this.textControl = new FormControl('link',  Validators.compose([]));
  }

  async openModal( modal: any) {
    this.modalService.open(modal, { centered: true, size: 'lg', keyboard: true, 
    animation: true });
  }

  copyHeroName() {
    this.clipboard.copy(this.textControl.value);
  }
}
