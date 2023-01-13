import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './components';
import { LoginComponent } from './login';
import { CreateShowRoomComponent } from './show-room/create-showrom/create-showroom.component';
import { ShowRoomListComponent } from './show-room/showroom-list/showroom-list.component';
import { InvoiceComponent } from './invoices/invoice';
import { InvoiceListComponent } from './invoices/invoice-list/invoice-list.component';
import { RegisterComponent } from './users/register';
import { UserListComponent } from './users/user-list/user-list.component';



@NgModule({
  imports: [ 
         BrowserModule,
         ReactiveFormsModule,
         HttpClientModule,
         AppRoutingModule,
         FormsModule,
     ],
     declarations: [
         AppComponent,
         AlertComponent,
         HomeComponent,
         LoginComponent,
         RegisterComponent,
         InvoiceComponent,
         InvoiceListComponent,
         UserListComponent,
         CreateShowRoomComponent,
         ShowRoomListComponent
        
     ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
