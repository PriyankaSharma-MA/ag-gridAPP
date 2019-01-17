import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import 'ag-grid-enterprise';
import {LicenseManager} from "ag-grid-enterprise";
LicenseManager.setLicenseKey("Foundation_Source_Philanthropic_Inc__Foundation_Source___3Devs2_SaaS_21_December_2019__MTU3Njg4NjQwMDAwMA==ee8b7707231e7b40f6e71ec9bf87a7f1");

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
