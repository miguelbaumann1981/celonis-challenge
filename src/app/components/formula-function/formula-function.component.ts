import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ToastNotification } from 'src/app/interfaces/ToastNotification';
import { HandleToastService } from 'src/app/services/handle-toast.service';

@Component({
  selector: 'formula-function',
  templateUrl: './formula-function.component.html',
  styleUrls: ['./formula-function.component.scss']
})
export class FormulaFunctionComponent implements OnInit {

  @Input() public id: number = 0;
  @Input() public type: string = '';
  @Input() public functionName: string = '';
  @Input() public arguments: any[] = [];

  public argsFunction: any[] = [];
  items: MenuItem[] = [];
  public isMenuOpen: boolean = false;

  constructor(private handleToast: HandleToastService) { }

  ngOnInit(): void {
    this.argsFunction = this.arguments;
    console.log(this.arguments);

    this.items = [
      {
        label: 'New', 
        icon: 'pi pi-fw pi-plus', 
        command: () => {
          this.showToast();
        }
      },
      {label: 'Open', icon: 'pi pi-fw pi-download'},
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
