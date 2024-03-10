import { Component, Input, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ToastNotification } from 'src/app/interfaces/ToastNotification';
import { HandleToastService } from 'src/app/services/handle-toast.service';

@Component({
  selector: 'formula-paren',
  templateUrl: './formula-paren.component.html',
  styleUrls: ['./formula-paren.component.scss'],
})
export class FormulaParenComponent implements OnInit {

  @Input() public id: number = 0;
  @Input() public type: string = '';
  @Input() public expression: any;

  public items: MenuItem[] = [];
  public isMenuOpen: boolean = false;

  constructor(
    private handleToast: HandleToastService,
    private translatePipe: TranslatePipe
  ) { }

  ngOnInit(): void {
    this.items = [
      {
        label: this.translatePipe.transform('paren.menu_add_element'), 
        icon: 'pi pi-fw pi-plus', 
        command: () => this.addElement()
      },
      { 
        label: this.translatePipe.transform('paren.menu_delete_block'), 
        icon: 'pi pi-fw pi-times',
        command: () => this.deleteBlock()
      }
    ];
  }

  /*
    ** Method to toggle the menu button
  */
  showMenu(_id: number): void {
    if (this.id === _id) {
      this.isMenuOpen = !this.isMenuOpen;
    } 
  }

  /*
    ** Method to show toast message
  */
  public addElement(): void {
    const toast: ToastNotification = {
      type: 'error',
      message: this.translatePipe.transform('paren.toast_message_error')
    }
    this.handleToast.setToastMessage(toast);
    setTimeout(() => {
      this.isMenuOpen = false;
    }, 3000);
  }

  /*
    ** Method to show toast message
  */
  public deleteBlock(): void {
    const toast: ToastNotification = {
      type: 'error',
      message: this.translatePipe.transform('paren.toast_message_error')
    }
    this.handleToast.setToastMessage(toast);
    setTimeout(() => {
      this.isMenuOpen = false;
    }, 3000);
  }


}
