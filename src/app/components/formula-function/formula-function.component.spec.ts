import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormulaFunctionComponent } from './formula-function.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe } from '@angular/core';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastNotification } from 'src/app/interfaces/ToastNotification';

@Pipe({name: 'translate'})
class PipeTranslateMock {
  transform(): string {
    return '';
  }
}

describe('FormulaFunctionComponent', () => {
  let component: FormulaFunctionComponent;
  let fixture: ComponentFixture<FormulaFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
         }),
      ],
      declarations: [ 
        FormulaFunctionComponent,
        PipeTranslateMock
      ],
      providers: [
        TranslateService 
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('showMenu method toggles a status if Id is valid', () => {
    const newId = 2;
    component.id = 2;
    component.showMenu(newId);
    expect(component.isMenuOpen).toEqual(true);
  });

  it('showMenu method returns false', () => {
    const newId = 3;
    component.id = 2;
    component.showMenu(newId);
    expect(component.isMenuOpen).toBeFalsy();
  });

  it('ngOnInit lifecycle inits menu items', () => {
    const _items = [
      {
        label: 'Label 1',
        icon: 'icon 1',
        command: () => {}
      },
      {
        label: 'Label 2',
        icon: 'icon 2',
        command: () => {}
      }
    ];
    component.items = _items;
    component.ngOnInit();
    expect(component.items.length).toBe(2);
  });

  it('addElement method submits a toast notification through a service', () => {
    const toast: ToastNotification = {
      type: 'error',
      message: 'Error message'
    };
    component['handleToast'].setToastMessage(toast);
    component.addElement();
    expect(component).toBeTruthy();
  });

  it('addElement method closes the menu', fakeAsync(() => {
    component.addElement();
    tick(3000);
    expect(component.isMenuOpen).toBeFalse();
  }));

  it('deleteBlock method submits a toast notification through a service', () => {
    const toast: ToastNotification = {
      type: 'error',
      message: 'Error message'
    };
    component['handleToast'].setToastMessage(toast);
    component.deleteBlock();
    expect(component.isMenuOpen).toEqual(false);
  });

  it('deleteBlock method closes the menu', fakeAsync(() => {
    component.deleteBlock();
    tick(3000);
    expect(component.isMenuOpen).toBeFalse();
  }));
});
