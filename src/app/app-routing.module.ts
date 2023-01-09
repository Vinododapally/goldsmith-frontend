import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

const routes: Routes = [
  { path: '', component: HomeComponent },
     { path: 'login', component: LoginComponent },
     { path: 'register', component: RegisterComponent },
     { path: 'invoice', component: InvoiceComponent },

     // otherwise redirect to home
     { path: '**', redirectTo: '' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
