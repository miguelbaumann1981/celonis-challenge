import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

// @ts-ignore
import * as Parser from './parser/formula-parser.js';
import { FormulaOperatorComponent } from './components/formula-operator/formula-operator.component';
import { HandleFormulaService } from './services/handle-formula.service';
import { Subject, takeUntil } from 'rxjs';
import { HandleToastService } from './services/handle-toast.service';
import { ToastNotification } from './interfaces/ToastNotification.js';
import { TranslateService } from '@ngx-translate/core';
const parse = Parser.parse;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) 
  dynamicComponentContainer!: ViewContainerRef;

  // formula: string = "SQRT (SQR($b) - 4 * $a)";
  // formula: string = "($b + SQRT (SQR($b) - 4 * $a)) / (2 * $a)";
  // formula: string = "(4 - 3) / (2 * $a)";
  public formula: string = "(4 - SQR($b - 8)) / (2 * $a)";
  // public formula: string = "(2 * $a)";
  public syntaxTree: any;
  public syntaxTreeJson: string = "";
  public formulaBuiltArray: string[] = [];
  public toastNotification: ToastNotification = {};
  public selectedLanguage: string = 'uk';
  public isConverterEnabled: boolean = false;
 

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private handleFormula: HandleFormulaService ,
    private handleToast: HandleToastService,
    public translate: TranslateService
  ) {
      this.translate.setDefaultLang('en');
    }

  ngOnInit(): void {
    this.handleFormulaService();
    this.handleToastService();
  }

  /*
    ** Method to evaluate if formula has been modified
  */
  private handleFormulaService(): void {
    this.handleFormula.getSingleElement().pipe(takeUntil(this.destroy$)).subscribe(element => {
      if (element) {
        this.formula = '';
        this.formulaBuiltArray.push(element);
        this.formula = this.formulaBuiltArray.toString().replace(/,/g, ' ');
      }
    });
  }

  /*
    ** Method to evaluate if toast has been fired
  */
  private handleToastService(): void {
    this.handleToast.getToastMessage().pipe(takeUntil(this.destroy$)).subscribe(toast => {
      if (toast) {
        this.toastNotification = toast;
        if (this.toastNotification.type === 'success') {
          setTimeout(() => {
            this.toastNotification = {};
          }, 3000);
        }
      }
    });
  }

  /*
    ** Method to add operation component
  */
  public addOperatorComponent(operatorType: string, left: any, right: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormulaOperatorComponent);
    const componentRef = componentFactory.create(this.dynamicComponentContainer?.injector);
    componentRef.instance.operatorType = operatorType;
    componentRef.instance.leftSide = left;
    componentRef.instance.rightSide = right;
    this.dynamicComponentContainer.insert(componentRef.hostView);
  }

  /*
    ** Method to update syntaxTree and show it in view
  */
  public updateAstView() {
    this.isConverterEnabled = false;
    this.handleFormula.setFormula('');
    this.dynamicComponentContainer.clear();
    this.syntaxTree = parse(this.formula);
    this.syntaxTreeJson = JSON.stringify(this.syntaxTree, null, 2);
  }

  /*
    ** Method to convert syntaxTree and show it in view
  */
  public convertAstToFormula() {
    if (this.syntaxTree) {
      this.isConverterEnabled = true;
      this.addOperatorComponent(this.syntaxTree?.type, this.syntaxTree?.left, this.syntaxTree?.right);
    }
  }

  /*
    ** Method to close the toast notification
  */
  public closeToast(): void {
    this.toastNotification = {};
  }

  /*
    ** Method to set the language
  */
  public selectLanguage(country: string): void {
    this.selectedLanguage = country;
    if (this.selectedLanguage === 'uk') {
        this.translate.use('en');
    }
    if (this.selectedLanguage === 'spain') {
      this.translate.use('es');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
  }

}
