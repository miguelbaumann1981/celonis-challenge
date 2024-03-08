import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormulaParenComponent } from './components/formula-paren/formula-paren.component';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { FormulaOperatorComponent } from './components/formula-operator/formula-operator.component';
import { FormulaFunctionComponent } from './components/formula-function/formula-function.component';
import { FormulaElementComponent } from './components/formula-element/formula-element.component';
import { InputTextModule } from 'primeng/inputtext';
import { TreeSelectModule } from 'primeng/treeselect';
import {
  HttpClientModule,
} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    FormulaParenComponent,
    DynamicComponent,
    FormulaOperatorComponent,
    FormulaFunctionComponent,
    FormulaElementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    TreeSelectModule,
    HttpClientModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
