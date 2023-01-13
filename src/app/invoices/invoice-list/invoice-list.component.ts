
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Invoice } from "src/app/models";
import { AlertService } from "src/app/services";
import { InvoiceService } from "src/app/services/invoice.service";

@Component({
  selector: "app-invoice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrls: ["./invoice-list.component.css"]
})
export class InvoiceListComponent implements OnInit {
  invoices: Observable<Invoice[]>;

  constructor(private invoiceService: InvoiceService,
    private router: Router,private alertService: AlertService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.invoices = this.invoiceService.getAll();
  }

  deleteUser(id: number) {
    this.invoiceService.delete(id)
      .subscribe(
        data => {
          this.alertService.error('Invoice deleted successfully', true);
          this.reloadData();
        },
        error => console.log(error));
  }

  invoiceDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateInvoice(id: number){
    this.router.navigate(['update', id]);
  }
  addInvoice(){
  this.router.navigate(['invoice']);
  }
}
