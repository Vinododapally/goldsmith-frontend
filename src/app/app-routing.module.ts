import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { CreateShowRoomComponent } from './show-room/create-showrom/create-showroom.component';
import { ShowRoomListComponent } from './show-room/showroom-list/showroom-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
     { path: '', component: LoginComponent },
     { path: 'home', component: HomeComponent },
     { path: 'register', component: RegisterComponent },
     { path: 'users', component: UserListComponent },
     { path: 'invoice', component: InvoiceComponent },
     { path: 'invoices', component: InvoiceListComponent },
     { path: 'showroom', component: CreateShowRoomComponent },
     { path: 'showrooms', component: ShowRoomListComponent }

     // otherwise redirect to home
    // { path: '**', redirectTo: '' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
