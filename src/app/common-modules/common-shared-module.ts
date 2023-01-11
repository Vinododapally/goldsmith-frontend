
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./core-modules/footer/footer.component";
import { HeaderComponent } from "./core-modules/header/header.component";


@NgModule({
  imports: [
         CommonModule,
         RouterModule
     ],
     declarations: [
         FooterComponent,
         HeaderComponent
     ],
     exports: [
              FooterComponent,
              HeaderComponent
          ],
  providers: [],
})
export class CommonSharedModule { }
