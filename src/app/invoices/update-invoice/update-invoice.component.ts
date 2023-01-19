import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Invoice, User } from "src/app/models";
import { AlertService, UserService } from "src/app/services";
import { InvoiceService } from "src/app/services/invoice.service";

@Component({
selector: 'app-update-invoice',
templateUrl: './update-invoice.component.html',
styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponent implements OnInit {

id: number;
invoice: any;

constructor(private route: ActivatedRoute,private router: Router,
private invoiceService: InvoiceService, private alertService: AlertService) { }

ngOnInit() {
this.invoice = new Invoice();
this.id = this.route.snapshot.params['id'];
this.invoiceService.getById(this.id)
.subscribe(data => {
this.invoice = data;
this.deliveryDateSet();
}, error => console.log(error));

}

updateInvoice() {
this.invoiceService.update(this.invoice)
.subscribe(data => {
this.invoice = new User();
this.alertService.success('Invoice Updated successfully', true);
this.gotoList();
}, error => console.log(error));
}

onSubmit() {
this.updateInvoice();
}

gotoList() {
this.router.navigate(['/invoices']);
}
deliveryDateSet(){
    let dt = new Date(this.invoice.deliveryDate);
    let month = ('0' + (dt.getMonth() + 1)).slice(-2);
    let day   = ('0' + dt.getDate()).slice(-2);
    let year  = dt.getFullYear();
    this.invoice.deliveryDate = year + '-' + month + '-' + day;
}
}
