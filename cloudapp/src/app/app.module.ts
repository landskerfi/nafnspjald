import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, CloudAppTranslateModule, AlertModule } from '@exlibris/exl-cloudapp-angular-lib';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { PatronComponent } from './patron/patron.component';
import { SettingsComponent } from './settings/settings.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { LabelComponent } from './label/label.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { PrintlabelComponent } from './printlabel/printlabel.component';
import { PrintComponent } from './print/print.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PatronComponent,
    SettingsComponent,
    TopmenuComponent,
    LabelComponent,
    PrintlabelComponent,
    PrintComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBarcodeModule,     
    CloudAppTranslateModule.forRoot(),
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'standard' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
