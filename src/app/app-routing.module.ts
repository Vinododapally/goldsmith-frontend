import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards';
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
     { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
     { path: 'register', component: RegisterComponent,canActivate: [AuthGuard] },
     { path: 'users', component: UserListComponent,canActivate: [AuthGuard] },
     { path: 'invoice', component: InvoiceComponent ,canActivate: [AuthGuard]},
     { path: 'invoices', component: InvoiceListComponent,canActivate: [AuthGuard] },
     { path: 'showroom', component: CreateShowRoomComponent,canActivate: [AuthGuard] },
     { path: 'showrooms', component: ShowRoomListComponent,canActivate: [AuthGuard] }

     // otherwise redirect to home
    // { path: '**', redirectTo: '' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
