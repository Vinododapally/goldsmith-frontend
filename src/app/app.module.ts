import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './components';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { InvoiceComponent } from './invoice';

@NgModule({
  imports: [
         BrowserModule,
         ReactiveFormsModule,
         HttpClientModule,
         AppRoutingModule,
         FormsModule
     ],
     declarations: [
         AppComponent,
         AlertComponent,
         HomeComponent,
         LoginComponent,
         RegisterComponent,
         InvoiceComponent
     ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
