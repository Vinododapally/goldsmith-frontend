import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataComponent } from './data/data.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AuthGuard } from './guards';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoices/invoice';
import { InvoiceListComponent } from './invoices/invoice-list/invoice-list.component';
import { UpdateInvoiceComponent } from './invoices/update-invoice/update-invoice.component';
import { LoginComponent } from './login';
import { CreateShowRoomComponent } from './show-room/create-showrom/create-showroom.component';
import { ShowRoomListComponent } from './show-room/showroom-list/showroom-list.component';
import { UpdateShowRoomComponent } from './show-room/update-showroom/update-showroom.component';
import { RegisterComponent } from './users/register';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
     { path: '', component: LoginComponent },
     { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
     { path: 'register', component: RegisterComponent,canActivate: [AuthGuard] },
     { path: 'users', component: UserListComponent,canActivate: [AuthGuard] },
     { path: 'invoice', component: InvoiceComponent ,canActivate: [AuthGuard]},
     { path: 'invoices', component: InvoiceListComponent,canActivate: [AuthGuard] },
     { path: 'showroom', component: CreateShowRoomComponent,canActivate: [AuthGuard] },
     { path: 'showrooms', component: ShowRoomListComponent,canActivate: [AuthGuard] },
     { path: 'updateUser/:id', component: UpdateUserComponent,canActivate: [AuthGuard] },
     { path: 'updateshowroom/:id', component: UpdateShowRoomComponent,canActivate: [AuthGuard] },
     { path: 'updateinvoice/:id', component: UpdateInvoiceComponent,canActivate: [AuthGuard] },
     { path: 'upload', component: FileUploadComponent,canActivate: [AuthGuard] },
     { path: 'data', component: DataComponent},

     // otherwise redirect to home
    { path: '**', redirectTo: '' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
