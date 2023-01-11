
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from "../models";

@Component({
  selector: "app-invoice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrls: ["./invoice-list.component.css"]
})
export class InvoiceListComponent implements OnInit {
  invoices: Observable<Invoice[]>;

  constructor(private invoiceService: InvoiceService,
    private router: Router) {}

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
          console.log(data);
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
