import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './components';
import { LoginComponent } from './login';
import { CreateShowRoomComponent } from './show-room/create-showrom/create-showroom.component';
import { ShowRoomListComponent } from './show-room/showroom-list/showroom-list.component';
import { InvoiceComponent } from './invoices/invoice';
import { InvoiceListComponent } from './invoices/invoice-list/invoice-list.component';
import { RegisterComponent } from './users/register';
import { UserListComponent } from './users/user-list/user-list.component';
import { JwtInterceptor, ErrorInterceptor } from './helper';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DataComponent } from './data/data.component';
import { ExportToExcelService } from './services/export-to-excel.service';
import { TodosService } from './services/todos.service';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { UpdateShowRoomComponent } from './show-room/update-showroom/update-showroom.component';




@NgModule({
  imports: [
         BrowserModule,
         ReactiveFormsModule,
         HttpClientModule,
         AppRoutingModule,
         FormsModule,
         PaginationModule.forRoot(),
         //AvatarModule
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
         ShowRoomListComponent,
         DataComponent,
         UpdateUserComponent,
         UpdateShowRoomComponent

     ],
     providers: [
     TodosService, ExportToExcelService,
      // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
