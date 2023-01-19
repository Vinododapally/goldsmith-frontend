
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AlertService } from "src/app/services";
import { InvoiceService } from "src/app/services/invoice.service";
import { ExportToExcelService } from "src/app/services/export-to-excel.service";
import { PageChangedEvent } from "ngx-bootstrap";

@Component({
  selector: "app-invoice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrls: ["./invoice-list.component.css"]
})
export class InvoiceListComponent implements OnInit {
  invoices: any = [];

  // filtering changes starts
  returnedInvoiceArray?: any[];
  returnedInvoiceArrayCopy?: string[];
  startCount = 0;
  endCount = 12;
  itemsPerPage = [5, 10, 20, 50];
  selectedItemsPerPage: number = 5;
  exporting: any = false;

  userid: any;
  id: any;
  title: any = '';
  selectCompleted: any = '';
// filtering changes end

 showroom: any;
 fromDate: any;
 toDate: any;
 currentDate = new Date();
 sheetName ='Invoice-'+this.currentDate;

  constructor(private invoiceService: InvoiceService,
    private router: Router,private alertService: AlertService,
    private exportToExcel: ExportToExcelService) {

    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.invoiceService.getAll().subscribe((res) => {
      this.invoices = res;
      this.returnedInvoiceArray = this.invoices.slice(0, this.selectedItemsPerPage);
      this.returnedInvoiceArrayCopy = JSON.parse(JSON.stringify(this.returnedInvoiceArray));
    });
    this.showroom='';
    this.fromDate='';
    this.toDate='';
  }

  filterInvoices(){
    this.invoiceService.getInvoicesBasedOnTheparams(this.showroom,this.fromDate,this.toDate).subscribe((res) => {
      this.invoices = res;
      this.returnedInvoiceArray = this.invoices.slice(0, this.selectedItemsPerPage);
      this.returnedInvoiceArrayCopy = JSON.parse(JSON.stringify(this.returnedInvoiceArray));
    });
 
  }

  deleteInvoice(id: number) {
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

  invoiceUpdate(id: number){
    this.router.navigate(['updateinvoice', id]);
  }
  addInvoice(){
  this.router.navigate(['invoice']);
  }

// filtering changes starts
  pageChanged(event: PageChangedEvent): void {
    this.startCount = (event.page - 1) * event.itemsPerPage;
    this.endCount = event.page * event.itemsPerPage;
    this.returnedInvoiceArray = this.invoices.slice(this.startCount, this.endCount);
  }

  onChangePagination(event) {
    console.log(event.target.value);
    this.selectedItemsPerPage = event.target.value;
    this.returnedInvoiceArray = this.invoices.slice(0, this.selectedItemsPerPage);
  }

  exportToExcelFun() {
    this.exporting = true;
    this.exportToExcel.exportAsExcelFile(this.getDataToExport(), this.sheetName);
    setTimeout(() => {
      this.exporting = false;
    }, 3000);
  }

  getDataToExport() {
    const exportData = [];
    this.returnedInvoiceArray.forEach((el) => {
      const obj = {
        'Delivery Date': el.deliveryDate,
        'Order Number': el.orderNumber,
        'Show Room': el.showroom,
        'item Name': el.itemName,
        'Gross Weight': el.grossWeight,
        'Total Stones': el.totalStones,
        'StoneWeight InCarat': el.stoneWeightInCarat,
        'StoneWeight InGrams': el.stoneWeightInGrams,
        'Net Weight': el.netWeight,
        'Gold (92 %)': el.gold92Per,
        'Gold (12 %)': el.gold12Per,
        'Making Charges': el.makingCharges,
      };
      exportData.push(obj);
    });
    return exportData;
  }

}

