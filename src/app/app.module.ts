import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {AgGridModule} from "ag-grid-angular";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'ag-grid-enterprise';
import {LicenseManager} from "ag-grid-enterprise";
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AppRoutingModule }        from './app-routing.module';
import { AuthGuard } from './_guards/auth.guard';
LicenseManager.setLicenseKey("Foundation_Source_Philanthropic_Inc__Foundation_Source___3Devs2_SaaS_21_December_2019__MTU3Njg4NjQwMDAwMA==ee8b7707231e7b40f6e71ec9bf87a7f1");

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewComponent
    

  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxMatSelectSearchModule,
    AgGridModule.withComponents([])
  
  ],
  
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
