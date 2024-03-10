import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { ToastNotification } from 'src/app/interfaces/ToastNotification';
import { HandleToastService } from 'src/app/services/handle-toast.service';

@Component({
  selector: 'formula-paren',
  templateUrl: './formula-paren.component.html',
  styleUrls: ['./formula-paren.component.scss'],
  providers: [MessageService]
})
export class FormulaParenComponent implements OnInit {

  @Input() public id: number = 0;
  @Input() public type: string = '';
  @Input() public expression: any;

  items: MenuItem[] = [];
  public isMenuOpen: boolean = false;

  constructor(
    private handleToast: HandleToastService,
    private messageService: MessageService, 
  ) { }

  ngOnInit(): void {
    console.log(this.id);

    this.items = [
      {
        label: 'New', 
        icon: 'pi pi-fw pi-plus', 
        command: () => {
          this.showToast();
        }
      },
      {label: 'Open', icon: 'pi pi-fw pi-download'},
      {label: 'Undo', icon: 'pi pi-fw pi-refresh'}
    ];
  }

  showMenu(_id: number): void {
    if (this.id === _id) {
      this.isMenuOpen = !this.isMenuOpen;
    } 
  }



  showToast() {
    const toast: ToastNotification = {
      type: 'error',
      message: 'Sorry....'
    }
    this.handleToast.setToastMessage(toast);
    setTimeout(() => {
      this.isMenuOpen = false;
    }, 3000);
  }


}
