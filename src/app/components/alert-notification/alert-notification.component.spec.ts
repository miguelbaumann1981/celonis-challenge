import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertNotificationComponent } from './alert-notification.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe } from '@angular/core';

// Pipe Translate mocked
@Pipe({name: 'translate'})
class PipeTranslateMock {
  transform(): string {
    return '';
  }
}

describe('AlertNotificationComponent', () => {
  let component: AlertNotificationComponent;
  let fixture: ComponentFixture<AlertNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        AlertNotificationComponent,
        PipeTranslateMock
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('toggleExamples method changes status', () => {
    const status = component.showExamples;
    component.toggleExamples();
    expect(status).toEqual(false);
  });
});
