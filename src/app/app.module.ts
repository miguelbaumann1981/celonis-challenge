// ANGULAR DEPENDENCIES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient,  HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

// TRANSLATE
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// COMPONENTS
import { AppComponent } from './app.component';
import { FormulaParenComponent } from './components/formula-paren/formula-paren.component';
import { FormulaOperatorComponent } from './components/formula-operator/formula-operator.component';
import { FormulaFunctionComponent } from './components/formula-function/formula-function.component';
import { FormulaElementComponent } from './components/formula-element/formula-element.component';
import { FormulaSymbolComponent } from './components/formula-symbol/formula-symbol.component';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';
import { AlertNotificationComponent } from './components/alert-notification/alert-notification.component';

// PRIME NG LIBRARY
import { InputTextModule } from 'primeng/inputtext';
import { TreeSelectModule } from 'primeng/treeselect';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    FormulaParenComponent,
    FormulaOperatorComponent,
    FormulaFunctionComponent,
    FormulaElementComponent,
    FormulaSymbolComponent,
    ToastNotificationComponent,
    AlertNotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    // PRIME NG LIBRARY
    InputTextModule,
    TreeSelectModule,
    HttpClientModule,
    ButtonModule,
    DropdownModule,
    TooltipModule,
    ToastModule,
    InputTextareaModule,
    MenuModule,
    DialogModule
  ],
  providers: [
    HttpClientModule, 
    TranslatePipe,
    {
      provide: LOCALE_ID, 
      useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
